import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import BASE_URL from "@/utils/globalBaseUrl";

export default function EditAccount() {

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [error, setError] = useState('');
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(true);
  const [pwMatchError, setPwMatchError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    pw: '',
    address1: '',
    address2: '',
    post: '',
    email1: '',
    email2: '',
    phone1: '',
    phone2: '',
    phone3: ''
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });



  // 마이페이지 조회
  useEffect(() => {

    if (!userId) {
      console.error("userId is not defined");
      return;
    }

    else {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/bisang/mypage/${userId}`, {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
              'Access-Control-Allow-Origin': '*'
            }
          });
          if (response.data) {
            setFormData(response.data);
          } else {
            console.log('No data found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      if (token && userId) {
        fetchUserData();
      }
    }
  }, [userId, token]);

  // 현재 비밀번호 유효성 확인
  const checkCurrentPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/bisang/mypage/pwCheck`, {
        userId: userId,
        pw: password.current
      }, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Access-Control-Allow-Origin': '*'
        }
      });
      console.log('Password check response:', response.data);
      return response.data == true;
    } catch (error) {
      console.error('Error checking password:', error);
      if (error.response) {
        // 서버 응답이 있는 경우
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // 요청은 보냈지만 응답이 없는 경우
        console.error('Request data:', error.request);
      } else {
        // 기타 오류
        console.error('Error message:', error.message);
      }
      return false;
    }
  };

  useEffect(() => {
    const validateCurrentPw = async () => {
      if (password.current) {
        const isValid = await checkCurrentPassword();

        if (!isValid) {
          setError('현재 비밀번호가 올바르지 않습니다.');
          setIsCurrentPasswordValid(false);
        } else {
          setError('');
          setIsCurrentPasswordValid(true);
        }
      }
    };
    validateCurrentPw();
  }, [password.current]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.new && password.new !== password.confirm) {
      setPwMatchError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setPwMatchError('');
    }

    if (password.new && !isCurrentPasswordValid) {
      setError('현재 비밀번호가 올바르지 않습니다.');
      return;
    } else {
      setError('');
    }

    const updatePayload = { ...formData };

    if (password.new) {
      updatePayload.pw = password.new;
    }

    // 수정 정보 업데이트
    try {
      const response = await axios.put(`${BASE_URL}/bisang/mypage/${userId}/profile`, updatePayload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Access-Control-Allow-Origin': '*'
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

    if (id !== 'current' && id !== 'new' && id !== 'confirmS') {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
    }
  };

  const handlePasswordFieldChange = async (e) => {
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
                    />
                    <label htmlFor="address2">상세주소</label>
                  </div>
                </div>
              </div>

              <div className="email-form">
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="email1"
                    value={formData.email1}
                    onChange={handleChange}
                  />
                  <label htmlFor="email1">이메일</label>
                </div>

                <span className="email-separator">@</span>

                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="email2"
                    value={formData.email2}
                    onChange={handleChange}
                  />
                </div>
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
                  />
                  <label htmlFor="new">새 비밀번호</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    id="confirm"
                    placeholder="Confirm new password"
                    value={password.confirm}
                    onChange={handlePasswordFieldChange}
                  />
                  <label htmlFor="confirm">
                    새 비밀번호 확인
                  </label>
                  {pwMatchError && <div className="text-danger">{pwMatchError}</div>}
                </div>
              </div>
              <div className="btn-container">
                <button className="btn btn-primary">수정하기</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
