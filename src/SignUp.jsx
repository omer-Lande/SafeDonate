// src/SignUp.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t("password_mismatch"));
      return;
    }
    // Add signup logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="form-container">
      <h2>{t("signup")}</h2>
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
        <div>
          <label>{t("confirm_password")}</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{t("signup")}</button>
      </form>
      <div>
        <Link to="/login">{t("have_account")}</Link>
      </div>
      <div>
        <button onClick={() => navigate("/")}>{t("back")}</button>
      </div>
    </div>
  );
};

export default SignUp;
