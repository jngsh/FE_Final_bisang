import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import BASE_URL from "@/utils/globalBaseUrl";

export default function EditAccount() {

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [ error, setError ] = useState('');

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
          // setPassword(prev => ({ ...prev, current: response.data.pw }));
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

  const checkCurrentPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/mypage/pwCheck`, {
        userId: userId,
        pw: password.current
      }, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
      return response.data; // true 또는 false 반환
    } catch (error) {
      console.error('Error checking password:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.new && password.new !== password.confirm) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }
    // const isPasswordValid = await checkCurrentPassword();
    

    // if (!isPasswordValid) {
    //   setError('현재 비밀번호가 올바르지 않습니다.');
    //   return;
    // } else {
    //   setError('');
    // }

    let isPasswordValid = true;

    if (password.new){
      isPasswordValid = await checkCurrentPassword();
      if(!isPasswordValid){
        setError('현재 비밀번호가 올바르지 않습니다.');
        return;
      } else {
        setError('');
      }
    }

    const updatePayload = { ...formData };

    if (password.new) {
            updatePayload.pw = password.new;
    }

    try {
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

    if(id !== 'account_current_password' && id !== 'account_new_password' && id !== 'account_confirm_password'){
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }  

    // if (id === 'pw'){
    //   setPassword(prev => ({
    //     ...prev,
    //     current: value
    //   }));
    // }

  };

  const handlePasswordFieldChange = (e) => {
    const { id, value } = e.target;
    setPassword(prev => ({
      ...prev,
      [id]: value
    }));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      console.log("Daum Postcode script loaded");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePostcodeSearch = () => {
    if (!window.daum) {
      console.error("Daum Postcode script is not loaded yet");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.roadAddress;
        let extraAddress = "";

        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddress += extraAddress !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddress !== "") {
          extraAddress = " (" + extraAddress + ")";
        }
        fullAddress += extraAddress;

        setFormData((prevData) => ({
          ...prevData,
          post: data.zonecode,
          address1: fullAddress,
          address2: ''
        }));
      },
    }).open();
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

              <div className="address-form">
              <div className="address-row">
              <div className="col-md-6">
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="post"
                    value={formData.post}
                    onChange={handleChange}
                    readOnly
                    // placeholder="Last Name"
                    // required
                  />
                  <label htmlFor="post">우편주소</label>
                  
                </div>
              </div>
              <button type="button" onClick={handlePostcodeSearch} className="address-btn">주소 찾기</button>
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
                  <label htmlFor="address1">주소</label>
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
                  <label htmlFor="address2">상세주소</label>
                </div>
              </div>
              </div>

              <div className="email-form">
              {/* <div className="col-md-12"> */}
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="email1"
                    value={formData.email1}
                    onChange={handleChange}
                  />
                  <label htmlFor="email1">이메일 1</label>
                </div>
              {/* </div> */}

              <span className="email-separator">@</span>
              
              {/* <div className="col-md-12"> */}
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="email2"
                    value={formData.email2}
                    onChange={handleChange}
                  />
                  {/* <label htmlFor="email2">이메일 2</label> */}
                </div>
              {/* </div> */}
              </div>

              <div className="phone-form">
                <div className="form-floating my-3">
                  <select
                    type="number"
                    className="form-control"
                    id="phone1"
                    value={formData.phone1}
                    onChange={handleChange}
                  >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  </select>
                  <label htmlFor="phone1">전화번호</label>
                </div>

                <span className="phone-seperator">-</span>

                <div className="form-floating my-3">
                  <input
                    type="number"
                    className="form-control"
                    id="phone2"
                    value={formData.phone2}
                    onChange={handleChange}
                    pattern="[0-9]*"
                  />
                </div>

                <span className="phone-seperator">-</span>

                <div className="form-floating my-3">
                  <input
                    type="number"
                    className="form-control"
                    id="phone3"
                    value={formData.phone3}
                    onChange={handleChange}
                    pattern="[0-9]*"
                  />
                </div>
              </div>



              <div className="col-md-12">
                <div className="my-3">
                  <h5 className="text-uppercase mb-0">비밀번호 변경</h5>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    id="current"
                    placeholder="Current password"
                    value={password.current}
                    onChange={handlePasswordFieldChange}
                    // required
                  />
                  <label htmlFor="current">
                    현재 비밀번호
                  </label>
                  {error && <div className="text-danger">{error}</div>}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    id="new"
                    placeholder="New password"
                    value={password.new}
                    onChange={handlePasswordFieldChange}
                    // required
                  />
                  <label htmlFor="new">새 비밀번호</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    // data-cf-pwd="#account_new_password"
                    id="confirm"
                    placeholder="Confirm new password"
                    value={password.confirm}
                    onChange={handlePasswordFieldChange}
                    // required
                  />
                  <label htmlFor="confirm">
                    새 비밀번호 확인
                  </label>
                  <div className="invalid-feedback">
                    Passwords did not match!
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="my-3">
                  <button className="btn btn-primary">수정하기</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
