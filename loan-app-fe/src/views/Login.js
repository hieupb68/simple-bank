// Login.js
import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm' // Import the LoginForm component

export default function Login() {
  useEffect(() => {
    document.title = "Đăng nhập";
  })
  return (
    <div
      style={{
        height: "100%",
        background: 'radial-gradient(circle, rgba(66,134,244,1) 0%, rgba(55,59,68,1) 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LoginForm /> {/* Render the LoginForm component */}
    </div>
  );
};
