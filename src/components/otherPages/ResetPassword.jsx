import { Link } from "react-router-dom";
import BASE_URL from "@/utils/globalBaseUrl";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {

  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit  = async (e) => {
    e.preventDefault();

    if (!email1 || !email2){
      setError('이메일을 입력해수세요.');
      return ;
    }
    try {
      const checkResponse = await axios.get(`${BASE_URL}/bisang/auth/checkEmail`,
                                              {params: {email1, email2}});
      if (!checkResponse.data){
        setError('이메일이 유효하지 않습니다.');
        return ;
      }

      await axios.post(`${BASE_URL}/bisang/auth/findPw`, {email1: email1, email2: email2});

      alert('임시 비밀번호가 이메일로 전송되었습니다.');
    }catch(err){
      console.error(err);
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <section className="login-register container">
      <h2 className="section-title text-center fs-3 mb-xl-5">
        비밀번호 찾기
      </h2>
      <p className="passwordP">회원가입할 때 이메일로 새 비밀번호를 보내드립니다.</p>
      <div className="reset-form">
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="reset-email-form">
          <div className="form-floating mb-3">
            <input
              name="email1"
              type="text"
              className="form-control form-control_gray"
              placeholder="이메일*"
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
              required
            />
            <label>이메일*</label>
            <span className="email-separator">@</span>
            <input
              name="email2"
              type="text"
              className="form-control form-control_gray"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
              required
            />
          </div>
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <button
            className="btn btn-primary w-100 text-uppercase"
            type="submit"
          >
            제출하기
          </button>

          <div className="customer-option mt-4 text-center">
            
            <Link to="/login_register" className="btn-text js-show-register">
              로그인
            </Link>
            <span className="text-secondary">으로 돌아가기</span>
          </div>
        </form>
      </div>
    </section>
  );
}
