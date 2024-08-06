import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> //콘솔 두번 찍히기 금지~
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
