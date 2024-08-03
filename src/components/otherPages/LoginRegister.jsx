import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import BASE_URL from "@/utils/globalBaseUrl";
import { useContextElement } from "@/context/Context";

export default function LoginRegister() {


  const navigate = useNavigate();
  const location = useLocation();
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [confirmPw, setConfirmPw] = useState(""); // 비밀번호 확인
  const [pwMatchError, setPwMatchError] = useState(""); // 회원가입 폼 제출시 비밀번호 확인
  const [emailDomain, setEmailDomain] = useState("naver.com");
  const [emailCustomDomain, setEmailCustomDomain] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  
  const {setLogined} = useContextElement();

  const [activeTab, setActiveTab] = useState("login");

  const [loginData, setLoginData] = useState({
    userid:"",
    id:"",
    pw:"",
    error:""
  });

  const [registerData, setRegisterData] = useState({
    username:"",
    id:"",
    pw:"",
    address1:"",
    address2:"",
    post:"",
    email1:"",
    email2:"",
    phone1:"010",
    phone2:"",
    phone3:""
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get("tab");
    if (tab === "register") {
      setActiveTab("register");
    } else {
      setActiveTab("login");
    }
  }, [location.search]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRegisterChange = async (e) => {
    const { name, value } = e.target;

    if (name === "pw") {
      const isValidPw = /^[a-zA-Z0-9@$!%*?&]{8,12}$/.test(value);
      if (!isValidPw) {
        setPwError("비밀번호는 8~12자리의 영문자 + 숫자 + 특수문자여야 합니다.");
      } else {
        setPwError("");
      } 
    }else if (name === "confirmPw") {
      if (value !== registerData.pw) {
        setPwMatchError("비밀번호가 일치하지 않습니다.");
      } else {
        setPwMatchError("");
      }
      setConfirmPw(value);
    }

    setRegisterData(prevData => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (registerData.pw) {
      const isValidPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/.test(registerData.pw);
      if (!isValidPw) {
        setPwError("비밀번호는 8~12자리의 영문자 + 숫자 + 특수문자여야 합니다.");
      } else {
        setPwError("");
      }
    }
  }, [registerData.pw]);

  const handleIdCheck = async () => {
    if (!registerData.id) {
      setIdError("아이디를 입력해 주세요.");
      return;
    }
    try {
      let response = await axios.post(`${BASE_URL}/bisang/auth/idCheck`, { id: registerData.id } );
      if (response.data) {
        setIdError("이미 존재하는 아이디입니다.");
      } else {
        setIdError("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("ID check error:", error.response?.data || error.message);
      setIdError("아이디 중복 확인 중 오류가 발생했습니다.");
    }
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

        setRegisterData((prevData) => ({
          ...prevData,
          post: data.zonecode,
          address1: fullAddress,
        }));
      },
    }).open();
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        fetchDataWithToken(); // 토큰이 있다면 API 요청을 통해 데이터를 가져오거나 사용자의 로그인 상태를 확인합니다.
    } else {
        console.log("User is not logged in");
        // 로그인 페이지로 리다이렉트 또는 로그인 상태에 따른 처리를 수행
    }
}, []);


  const fetchDataWithToken = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/bisang/auth/check-login`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Data fetched successfully:", response.data);
        console.log("UserID:",userId);
        // navigate('/');
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    } else {
      console.log("No token found");
    }
};


  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    try {
      const response = await axios.post(`${BASE_URL}/bisang/auth/login`, loginData);
      console.log("Login successful:", response.data);

      if (response.data.token) {
        // JWT토큰 로컬스토리지에 저장
        localStorage.setItem("token", response.data.token);

        
        // 서버 응답에서 userId를 가져와서 로컬스토리지에 저장
        if (response.data.userId) {
          console.log("userId recived:",response.data.userId);
          localStorage.setItem("userId", response.data.userId);
          setLogined(true);
        } else {
            console.error("userId not found in response");
        }
        
        setLoginData(prevData => ({ ...prevData, error: '' }));
        navigate('/'); // Redirect on success
      } else {
        console.error("Token not found in response");
        setLoginData(prevData => ({ ...prevData, error: '토큰을 받지 못했습니다.' }));
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      // 로그인 실패 후의 처리 (예: 에러 메시지 표시 등)
      setLoginData(prevData => ({
        ...prevData,
        error: '비밀번호가 틀렸습니다.' // 로그인 실패 메시지 설정
      }));
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    if (registerData.pw !== confirmPw) {
      setPwMatchError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (idError === "이미 존재하는 아이디입니다.") {
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/bisang/auth/signup`, registerData);
      console.log("Registration successful:", response.data);
      // 회원가입 성공 후의 처리 (예: 리다이렉트, 상태 업데이트 등)
      setActiveTab("login");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {z
      console.error("Registration error:", error.response?.data || error.message);
      // 회원가입 실패 후의 처리 (예: 에러 메시지 표시 등)
    }
  };

  const handleEmailDomainChange = (e) => {
    const selectedDomain = e.target.value;
    setEmailDomain(selectedDomain);
    setIsCustomDomain(selectedDomain === "custom");

    if (selectedDomain !== "custom") {
      setRegisterData(prevData => ({
        ...prevData,
        email2: selectedDomain
      }));
    } else {
      setRegisterData(prevData => ({
        ...prevData,
        email2: ""
      }));
    }
  };
  

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "email1") {
      setRegisterData((prevData) => ({
        ...prevData,
        email1: value,
        email2: isCustomDomain ? emailCustomDomain : emailDomain,
      }));
    } else {
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  return (
    <section className="login-register container">
      <h2 className="d-none">Login & Register</h2>
      <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link nav-link_underscore ${activeTab === "login" ? "active" : ""}`}
            id="login-tab"
            data-bs-toggle="tab"
            href="#tab-item-login"
            role="tab"
            aria-controls="tab-item-login"
            aria-selected={activeTab === "login"}
            onClick={() => setActiveTab("login")}
          >
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link nav-link_underscore ${activeTab === "register" ? "active" : ""}`}
            id="register-tab"
            data-bs-toggle="tab"
            href="#tab-item-register"
            role="tab"
            aria-controls="tab-item-register"
            aria-selected={activeTab === "register"}
            onClick={() => setActiveTab("register")}
          >
            Register
          </a>
        </li>
      </ul>
      <div className="tab-content pt-2" id="login_register_tab_content">
        <div
          className={`tab-pane fade ${activeTab === "login" ? "show active" : ""}`}
          id="tab-item-login"
          role="tabpanel"
          aria-labelledby="login-tab"
        >
          <div className="login-form">
            <form
              onSubmit={handleLoginSubmit}
              className="needs-validation"
            >
              <div className="form-floating mb-3">
                <input
                  name="id"
                  type="text"
                  className="form-control form-control_gray"
                  placeholder="아이디 *"
                  required
                  value={loginData.id}
    
                  onChange={handleLoginChange}
                />
                <label htmlFor="id">아이디 *</label>
              </div>

              <div className="pb-3"></div>

              <div className="form-floating mb-3">
                <input
                  name="pw"
                  type="password"
                  className="form-control form-control_gray"
                  id="pw"
                  placeholder="비밀번호 *"
                  value={loginData.pw}
                  onChange={handleLoginChange}
                  required
                />
                <label htmlFor="pw">비밀번호 *</label>
              </div>

              <div className="d-flex align-items-center mb-3 pb-2">
                <div className="form-check mb-0">
                  <input
                    name="remember"
                    className="form-check-input form-check-input_fill"
                    type="checkbox"
                    defaultValue=""
                  />
                  <label className="form-check-label text-secondary">
                    Remember me
                  </label>
                </div>
                <Link to="/reset_password" className="btn-text ms-auto">
                  Lost password?
                </Link>
              </div>

              {loginData.error && <p className="text-danger">{loginData.error}</p>}

              <button
                className="btn btn-primary w-100 text-uppercase"
                type="submit"
              >
                로그인
              </button>

              <div className="customer-option mt-4 text-center">
                <span className="text-secondary">아직 계정이 없으신가요?</span>{" "}
                <a 
                  href="#register-tab" 
                  className="btn-text js-show-register"
                  onClick={(e) => {
                    e.preventDefault(); // 링크 기본 동작 방지
                    setActiveTab("register"); // 탭 상태 변경
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // 화면 스크롤
                  }}
                >
                  회원가입하기
                </a>
              </div>
            </form>
          </div>
        </div>



        <div
          className={`tab-pane fade ${activeTab === "register" ? "show active" : ""}`}
          id="tab-item-register"
          role="tabpanel"
          aria-labelledby="register-tab"
        >
          <div className="register-form">
            <form
              onSubmit={handleRegisterSubmit}
              className="needs-validation"
            >
              <div className="form-floating mb-3">
                <div className="id-container">
                <input
                  name="id"
                  type="text"
                  className="form-control form-control_gray"
                  id="id"
                  placeholder="아이디 *"
                  required
                  value={registerData.id}
                  onChange={handleRegisterChange}
                />
                  <button
                    type="button"
                    className="btn btn-secondary id-check-btn"
                    onClick={handleIdCheck}
                  >
                    아이디 중복 확인
                  </button>
                </div>
                {/* <label htmlFor="id">아이디 **</label> */}
                {idError && <p className="text-danger">{idError}</p>}
              </div>

              <div className="pb-3"></div>

              <div className="form-floating mb-3">
                <input
                  name="pw"
                  type="password"
                  className="form-control form-control_gray"
                  id="pw"
                  placeholder="비밀번호 *"
                  required
                  value={registerData.pw}
                  onChange={handleRegisterChange}
                />
                <label htmlFor="pw">비밀번호 *</label>
                {pwError && <p className="text-danger">{pwError}</p>}
              </div>

              <div className="pb-3"></div>

              <div className="form-floating mb-3">
                <input
                  name="confirmPw"
                  type="password"
                  className="form-control form-control_gray"
                  id="confirmPw"
                  placeholder="비밀번호 확인 *"
                  required
                  value={confirmPw}
                  onChange={handleRegisterChange}
                />
                <label htmlFor="confirmPw">비밀번호 확인 *</label>
                {pwMatchError && <p className="text-danger">{pwMatchError}</p>}
              </div>

              <div className="pb-3"></div>

              <div className="form-floating mb-3">
                <div className="email-container">
                <div className="email-part">
                  <input
                    name="email1"
                    type="text"
                    className="form-control form-control_gray email-input"
                    id="email1"
                    placeholder="이메일"
                    required
                    value={registerData.email1}
                    onChange={handleEmailChange}
                  />
                  <label htmlFor="email1"></label>
                </div>
                <span className="email-separator">@</span>
                <div className="email-part">
                  {isCustomDomain ? (
                    <input
                      name="email2"
                      type="text"
                      className="form-control form-control_gray email-input"
                      id="email2"
                      placeholder="직접입력"
                      value={emailCustomDomain}
                      onChange={(e) => {
                        setEmailCustomDomain(e.target.value);
                        setRegisterData((prevData) => ({
                          ...prevData,
                          email2: e.target.value
                        }));
                      }}
                    />
                  ) : (
                    <select
                      className="form-select email-select"
                      value={emailDomain}
                      onChange={(e) => {
                        handleEmailDomainChange(e);
                        setRegisterData((prevData) => ({
                          ...prevData,
                          email2: e.target.value
                        }));
                      }}
                    >
                      <option value="naver.com">naver.com</option>
                      <option value="google.com">google.com</option>
                      <option value="custom">직접 입력</option>
                    </select>
                  )}
                  <label htmlFor="email2"></label>
                </div>
                </div>
              </div>



              

              <div className="pb-3"></div>

              <div className="form-floating mb-3">
                <input
                  name="username"
                  type="text"
                  className="form-control form-control_gray"
                  id="username"
                  placeholder="이름 *"
                  required
                  value={registerData.username}
                  onChange={handleRegisterChange}
                />
                <label htmlFor="username">이름 *</label>
              </div>

              <div className="pb-3"></div>
              
              <div className="pb-3">
                <div className="form-group d-flex align-items-center">
                  {/* <label htmlFor="post">우편번호</label> */}
                  <input
                    type="text"
                    name="post"
                    id="post"
                    className="form-control"
                    placeholder="우편번호"
                    value={registerData.post}
                    onChange={handleRegisterChange}
                    readOnly
                  />
                  <button 
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={handlePostcodeSearch}>
                    주소 찾기
                  </button>
                </div>
                <div className="form-group">
                  {/* <label htmlFor="address1">주소1</label> */}
                  <input
                    type="text"
                    name="address1"
                    id="address1"
                    className="form-control"
                    placeholder="주소"
                    value={registerData.address1}
                    onChange={handleRegisterChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="address2">주소2</label> */}
                  <input
                    type="text"
                    name="address2"
                    id="address2"
                    className="form-control"
                    placeholder="상세주소"
                    value={registerData.address2}
                    onChange={handleRegisterChange}
                  />
                </div>
              </div>

              <div className="pb-3"></div>

              <div className="form-floating mb-3">
              <div className="d-flex align-items-center">
                <div className="phone-part position-relative">
                  <select
                    name="phone1"
                    type="text"
                    className="form-control form-control_gray"
                    id="phone1"
                    required
                    value={registerData.phone1}
                    onChange={handleRegisterChange}
                  >
                    <option value="010">010</option>
                    <option value="011">011</option>
                  </select>
                  <label htmlFor="phone1">전화번호</label>
                </div>

              <span className="phone-separator mx-2">-</span>

              <div className="phone-part position-relative">
                <input
                  name="phone2"
                  type="number"
                  className="form-control form-control_gray"
                  id="phone2"
                  placeholder="1234"
                  required
                  value={registerData.phone2}
                  onChange={handleRegisterChange}
                  pattern="[0-9]*"
                />
                {/* <label htmlFor="phone1">전화번호2</label> */}
              </div>

              <span className="phone-separator mx-2">-</span>

              <div className="phone-part position-relative">
                <input
                  name="phone3"
                  type="number"
                  className="form-control form-control_gray"
                  id="phone3"
                  placeholder="5678"
                  required
                  value={registerData.phone3}
                  onChange={handleRegisterChange}
                  pattern="[0-9]*"
                />
                {/* <label htmlFor="phone3">전화번호3</label> */}
              </div>
              </div>
              </div>
                

              <div className="d-flex align-items-center mb-3 pb-2">
                <p className="m-0">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our privacy policy.
                </p>
              </div>

              <button
                className="btn btn-primary w-100 text-uppercase"
                type="submit"
              >
                가입하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
