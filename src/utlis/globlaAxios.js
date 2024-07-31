//axios 설정
//base url 코드 설정 붙여넣기

//핸드폰으로 할때는 여기서 주소 바꿔주기(모바일, 컴 둘다 열어놓기)



// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.10.10.151:8090/bisang', // 실제 API URL로 변경
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;