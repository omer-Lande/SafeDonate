// src/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="form-container">
      <h2>{t("login")}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{t("password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{t("login")}</button>
      </form>
      <div>
        <Link to="/signup">{t("no_account")}</Link>
      </div>
      <div>
        <button onClick={() => navigate("/")}>{t("back")}</button>
      </div>
    </div>
  );
};

export default Login;
