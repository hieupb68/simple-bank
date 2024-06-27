// Login.js
import React, { useEffect } from 'react';
import SignupForm from '../components/SignupForm' // Import the LoginForm component

export default function Signup() {
  useEffect(() => {
    document.title = "Đăng ký tài khoản";
  })
  return (
    <div style={{
      height: "100%",
      background: 'radial-gradient(circle, rgba(66,134,244,1) 0%, rgba(55,59,68,1) 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <SignupForm /> {/* Render the LoginForm component */}
    </div>
  );
};
