// src/Home.jsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=be5b7935-3922-45d4-9638-08871b17ec95&limit=100"
        );
        if (!response.ok) {
          throw new Error(`Http error! status: ${response.status}`);
        }
        const jsonData = await response.json();

        const registeredOrganization = jsonData.result.records
          .filter((record) => record["סטטוס עמותה"] === "רשומה")
          .map((record) => record["שם עמותה בעברית"]);
        setData(registeredOrganization);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getWelcomeMessage = () => {
    return i18n.language === "he"
      ? "ברוכים הבאים ל SafeDonate"
      : t("welcome_message");
  };

  return (
    <div className="home">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <h1 className="home-title">{getWelcomeMessage()}</h1>
          <div className="grid-container">
            {data.map((name, index) => (
              <div key={index} className="grid-item clickable-tab">
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
