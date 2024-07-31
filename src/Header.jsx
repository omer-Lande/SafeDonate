import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(prevSidebar => !prevSidebar); // Toggle sidebar visibility
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          <Link to="/">Safe Donate</Link>
        </h1>
        <nav className="header-nav">
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
        <div 
          className={`hamburger ${sidebar ? 'active' : ''}`} 
          onClick={toggleSidebar}
        >
          &#9776;
        </div>
      </div>
      <div className={`sidebar ${sidebar ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/search-by-name" onClick={toggleSidebar}>Search by Name</Link>
          </li>
          <li>
            <Link to="/search-by-category" onClick={toggleSidebar}>Search by Category</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
