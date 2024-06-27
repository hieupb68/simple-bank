import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { CSSTransition } from "react-transition-group";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    const storedUsername = localStorage.getItem("username");
    setName(storedUsername);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, [name]);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const handleLogout = () => {
    // Clear sessionStorage
    localStorage.clear();
    // Redirect to login page
  };

  return (
    <header className="Header">
      <a href="/" className="ms-4">
        <img src={require("../assets/logo.png")} className="Logo" alt="logo" />
      </a>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <div>{name ? <a href="/">Xin chào {name}</a> : <a href="/"></a>}</div>
          <a href="/home">Hợp đồng</a>
          <a href="/newloan">Vay tiền</a>
          <a href="/login" className="btn btn-primary" onClick={handleLogout}>
            {name ? "Đăng xuất" : "Đăng nhập"}
          </a>
          {!name && (
            <a href="/signup" className="btn btn-outline-primary">
              Đăng ký
            </a>
          )}
        </nav>
      </CSSTransition>
    </header>
  );
}
