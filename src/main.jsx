// src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "./index.css";
// import "./i18n"; // Import i18n configuration
// import { BrowserRouter } from "react-router-dom";
// import { I18nextProvider } from "react-i18next";
// import i18n from "./i18n";

// ReactDOM.render(
//   <React.StrictMode>
//     <I18nextProvider i18n={i18n}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </I18nextProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n"; // Import i18n configuration
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>   

    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>   

);
