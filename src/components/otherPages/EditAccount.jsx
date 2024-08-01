import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";

export default function EditAccount() {

  const BASE_URL = "http://localhost:8090";
  // const BASE_URL = "http://10.10.10.143:8090";

  const userId = localStorage.getItem("userId");
  console.log("userId1:",userId);
  const token = localStorage.getItem("token");
  
  const[formData, setFormData] = useState({
    username:'',
    pw:'',
    address1:'',
    address2: '',
    post: '',
    email1: '',
    email2: '',
    phone1: '',
    phone2: '',
    phone3: ''
  });

  const [password, setPassword] = useState({
    current:'',
    new:'',
    confirm:''
  });


  

  useEffect(()=>{
  
    if (!userId) {
      console.error("userId is not defined");
      console.log('userIderror:', userId);
      return;
    }
    
    else{
      console.log('token:', token);
      console.log('userId2:', userId);
    const fetchUserData = async () => {
      try{
        console.log('Fetching user data...'); // 데이터 로드 시작 시 로그
        const response = await axios.get(`${BASE_URL}/bisang/mypage/${userId}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : ''
          } 
        });
        if (response.data) {
          console.log('User data fetched:', response.data); // 데이터 로드 성공 시 로그
          setFormData(response.data);
        } else {
          console.log('No data found'); // 데이터가 없을 경우 로그
        }
      }catch(error){
        console.error('Error fetching user data:', error);
      }
    };
    if (token && userId){
      fetchUserData();
    }
  }
  }, [userId, token]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 회원 정보 및 비밀번호 업데이트
      const { pw, ...updateData } = formData;
      const updatePayload = { ...updateData };

      if (password.new) {
        updatePayload.pw = password.new;
      }

      const response = await axios.put(`${BASE_URL}/bisang/mypage/${userId}/profile`, updatePayload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });

      if (response.status === 200) {
        alert('프로필이 성공적으로 업데이트되었습니다!');
        setPassword({ current: '', new: '', confirm: '' });
      } else {
        alert('프로필 업데이트에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handlePasswordFieldChange = (e) => {
    const { id, value } = e.target;
    setPassword({
      ...password,
      [id]: value
    });
  };

  return (
    <div className="col-lg-9">
      <div className="page-content my-account__edit">
        <div className="my-account__edit-form">
          <form
            onSubmit={handleSubmit}
            className="needs-validation"
          >
            <div className="row">
              {/* 사용자이름 */}
              <div className="col-md-6">
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={formData.username}
                    readOnly
                  />
                  <label htmlFor="username">이름</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="post"
                    value={formData.post}
                    onChange={handleChange}
                    // placeholder="Last Name"
                    // required
                  />
                  <label htmlFor="post">우편주소</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    // placeholder="Last Name"
                    // required
                  />
                  <label htmlFor="address1">주소1</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    // placeholder="Last Name"
                    // required
                  />
                  <label htmlFor="address2">주소2</label>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email1"
                    value={formData.email1}
                    onChange={handleChange}
                  />
                  <label htmlFor="email1">이메일 1</label>
                </div>
              </div>
              
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email2"
                    value={formData.email2}
                    onChange={handleChange}
                  />
                  <label htmlFor="email2">이메일 2</label>
                </div>
              </div>



              <div className="col-md-12">
                <div className="my-3">
                  <h5 className="text-uppercase mb-0">Password Change</h5>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    id="account_current_password"
                    placeholder="Current password"
                    value={password.current}
                    onChange={handlePasswordFieldChange}
                    required
                  />
                  <label htmlFor="account_current_password">
                    Current password
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    id="account_new_password"
                    placeholder="New password"
                    value={password.new}
                    onChange={handlePasswordFieldChange}
                    required
                  />
                  <label htmlFor="account_new_password">New password</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    // data-cf-pwd="#account_new_password"
                    id="account_confirm_password"
                    placeholder="Confirm new password"
                    value={password.confirm}
                    onChange={handlePasswordFieldChange}
                    required
                  />
                  <label htmlFor="account_confirm_password">
                    Confirm new password
                  </label>
                  <div className="invalid-feedback">
                    Passwords did not match!
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="my-3">
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
