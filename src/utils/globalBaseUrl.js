const isLocalhost = window.location.hostname === 'localhost';
// console.log("window.location.hostname : ", window.location.hostname);
// console.log("isLocalhost : ", isLocalhost);
const BASE_URL = isLocalhost ? import.meta.env.VITE_BASE_URL_LOCAL : import.meta.env.VITE_BASE_URL_PROD;

console.log("BASE_URL:", BASE_URL); // 여기서는 찍힘

export default BASE_URL;