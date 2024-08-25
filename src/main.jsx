import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import Chat from "./chatbot/Chat.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> //콘솔 두번 찍히기 금지~
    <BrowserRouter>
      <App />
{/*       <Chat/> */}
    </BrowserRouter>
  // </React.StrictMode>
);
