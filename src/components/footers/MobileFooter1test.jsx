import { useContextElement } from "@/context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "@/utils/globalBaseUrl";


export default function MobileFooter1({isLogin,xxx}) {
  console.log("MobileFooter1 isLogin:",isLogin, xxx);
  
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    
    const token = localStorage.getItem("token");
    console.log("MobileFooter1 token:",token);
  
    setIsLogined(isLogin);
  

  });

  return (
   <>
   <h2>MobileFooter1</h2>
   #####{isLogined}
    @@@@@@@@@@isLogin: {isLogined?"true":"false"}
   </>
  );
}
