import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequiredSharp from "./RequiredSharp";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidMessage] = useState({
    username: {
      invalid: false,
      message: "",
    },
    password: {
      invalid: false,
      message: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) navigate("/home", { replace: true });
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setValidMessage({
      username: {
        invalid: false,
        message: "",
      },
      password: {
        invalid: false,
        message: "",
      },
    });

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenType", data.tokenType);
        localStorage.setItem("id", data.id);
        localStorage.setItem("roles", data.roles);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
        localStorage.setItem("isDeclared", data.isDeclared);

        window.location.href = "home";
      } else {
        if (data.message === "USERNAME_NOT_EXIST") {
          setValidMessage((prev) => ({
            ...prev,
            username: {
              invalid: true,
              message: "username không tồn tại!",
            },
          }));
        } else if (data.message === "PASSWORD_INCORRECT") {
          setValidMessage((prev) => ({
            ...prev,
            password: {
              invalid: true,
              message: "Mật khẩu không đúng, vui lòng thử lại!",
            },
          }));
        }
      }
    } catch (error) {
      alert("Hệ thống xảy ra lỗi, vui lòng thử lại!");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Đăng nhập</h4>
              <form
                className="needs-validation"
                onSubmit={handleLogin}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin(e);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <RequiredSharp /> Username:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validateMessage.username.invalid ? "is-invalid" : ""
                    }`}
                    id="username"
                    placeholder="Nhập username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    {validateMessage.username.message}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <RequiredSharp /> Mật khẩu:
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      validateMessage.password.invalid ? "is-invalid" : ""
                    }`}
                    id="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    {validateMessage.password.message}
                  </div>
                </div>
                <div>
                  Bạn chưa có tài khoản, <a href="/signup">Đăng ký</a>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-3 fs-5"
                >
                  Đăng nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
