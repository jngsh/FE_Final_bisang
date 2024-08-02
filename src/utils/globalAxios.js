//axios 설정
//base url 코드 설정 붙여넣기

//핸드폰으로 할때는 여기서 주소 바꿔주기(모바일, 컴 둘다 열어놓기)

// src/axiosInstance.js
import axios from 'axios';

// const isLocalhost = window.location.hostname === 'localhost';

const axiosInstance = axios.create({
  baseURL: 
  'https://b884-58-235-119-39.ngrok-free.app' , //ngrok실행시 매번 수정됨
  //  isLocalhost? 'http://localhost:8090' : 'http://10.10.10.151:8090',
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
