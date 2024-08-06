// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header"; // Import the Header component
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import "./App.css"; // Ensure that the App.css is imported
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const App = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ direction: "rtl", textAlign: "right" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <footer>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("he")}>עברית</button>
      </footer>
    </div>
  );
};

export default App;
