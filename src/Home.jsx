import React, { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=be5b7935-3922-45d4-9638-08871b17ec95&limit=100');
        if(!response.ok) {
          throw new Error(`Http error! status: ${response.status}`);
        }
        const jsonData  = await response.json();

      // Extracting the Hebrew organization names where the status is רשומה
      const registeredOrganization = jsonData.result.records
        .filter(record => record['סטטוס עמותה'] === 'רשומה')
        .map(record => record['שם עמותה בעברית'])
      setData(registeredOrganization);
      setLoading(false);
       // } else {
       //   throw new Error("Unexpected data structure");
     //   }        
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
    // below fetch / js logic
    //const data = "t-queen"

  return (
    <div className="home">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <h1 className="home-title">
            Welcome to Safe Donate</h1>
          <ul>
            {data.map((name, index) => (
              <li key={index}>{name}</li>
                // {JSON.stringify(item)}
           //   </li>
              //   {item.replace(/_/g, ' ')}
              // </li>
            ))}
          </ul>
        </div>
      )}    
    </div>
  );
};

export default Home;
