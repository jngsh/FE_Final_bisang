import BASE_URL from '@/utils/globalBaseUrl.js';
import axiosInstance from '../../../utils/globalAxios.js';
import axios from "axios";
import { useContextElement } from '@/context/Context.jsx';

// export default function About() {
const About = () => {
  const { cartId } = useContextElement();

  const handleButtonClick = async () => {
    console.log("버튼눌림");
    let xxx = { 'cartId': cartId };
    console.log(xxx);
    try {
      const response = await axiosInstance.post(`/bisang/pay/ready`, JSON.stringify(xxx),
        {
          headers: { //body에 뭐넣을지 미리 알려주는 역할
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': true,
            'ngrok-skip-browser-warning': true,
            'Access-Control-Allow-Origin': '*'
          }
        }

      );



      console.log("PaymentResponse:", response.data);
      console.log("그렇다면 이거는? PaymentResponse:", JSON.stringify(response.data, null, 2));



      //모바일/데스크탑 웹 여부에 따라 연결되는 url 선택
      const pcUrl = response.data.next_redirect_pc_url;
      const mobileUrl = response.data.next_redirect_mobile_url;

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      const redirectUrl = isMobile ? mobileUrl : pcUrl;
      // const redirectUrl =pcUrl;
      console.log(">>>>>>>>>>:" + redirectUrl);

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      }
    }
  };


  return (
    <section className="about-us container">
      <div className="mw-930">
      </div>
      <div className="about-us__content pb-5 mb-5">
        <p className="mb-5">
        </p>
        <div className="mw-930">
          <h3 className="mb-4"></h3>
          <p className="fs-6 fw-medium mb-4">
            <img
              src="/assets/images/aboutpeterpet.png" />
          </p>
        </div>
        <div className="mw-930 d-lg-flex align-items-lg-center">
          {/*           
          <div className="content-wrapper col-lg-6 px-lg-4">
              <h5 className="mb-3"></h5>
              
              
              <p>
              </p>
          </div> */}
        </div>
      </div>

      {/* <div className="mw-930">
        <h2 className="page-title"></h2>
      </div>
      <div className="about-us__content pb-5 mb-5">
        <p className="mb-5">
          {/*   */}
      {/* </p>
        <div className="mw-930">
            <h3 className="mb-4">OUR STORY</h3>
            <p className="fs-6 fw-medium mb-4">f
              서토리
            </p>
            <p className="mb-4">
            여기다 버튼을 만들어서 결제하는거처럼 만들거임
            </p>
            <div className="row mb-3">
              <div className="col-md-6">
                <h5 className="mb-3">그래서</h5>
                <p className="mb-3">
                  냥냥
                </p>
              </div>
              <div className="col-md-6">
                <h5 className="mb-3">조금만더내려봐</h5>
                <p className="mb-3">
                뇽뇽
                </p>
              </div>
            </div>
          </div>
        <div className="mw-930 d-lg-flex align-items-lg-center">
          <button className="image-wrapper col-lg-6" onClick={handleButtonClick}>
            <img
              style={{ height: "fit-content" }}
              className="h-auto"
              loading="lazy"
              src="/assets/images/상시형_로고 단독형 흰색 및 어두운배경_3D.png"
              width="300"
              height="400"
              alt="image"
            />
          </button>
          <div className="content-wrapper col-lg-6 px-lg-4">
              <h5 className="mb-3">💕고양이를 클리쿠!💕</h5>
              
              
              <p>
                고양이의 이름은 이도
              </p>
          </div>
        </div>
      </div> */}
    </section>



  );
};


export default About;
