import React, { useEffect } from 'react';
import Header from '../components/Header';
const Home = () => {

  useEffect(() => {
    document.title = "Admin Home";
  })
  return (
    <div className="user-home">
      <Header />
    </div>
  );
};

export default Home;
