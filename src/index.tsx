import React from "react";
// @ts-ignore
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter
      basename={
        process.env.REACT_APP_NODE_ENV === "production" ? "/convergent" : "/"
      }
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
