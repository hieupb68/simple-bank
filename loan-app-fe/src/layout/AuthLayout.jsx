import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Hãy đăng nhập để tiếp tục");
      navigate("/login");

      // window.location.href = "/login";
    }
  });
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
