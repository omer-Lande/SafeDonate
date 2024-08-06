// src/Header.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <header style={{ textAlign: "right" }}>
      <h1>{t("app_name")}</h1>
      <input type="text" placeholder={t("search")} />
      <button>{t("login")}</button>
      <button>{t("signup")}</button>
    </header>
  );
};

export default Header;
