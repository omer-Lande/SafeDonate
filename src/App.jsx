import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header'; // Import the Header component
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import './App.css'; // Ensure that the App.css is imported

const App = () => {
  return (
    <div>
      <Header /> {Header}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
