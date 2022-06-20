import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./style/global";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


const main = ReactDOM.createRoot(
  document.getElementById("main") as HTMLElement
);

main.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

