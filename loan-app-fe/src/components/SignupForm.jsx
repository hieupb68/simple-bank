import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import RequiredSharp from "./RequiredSharp";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [validateMessage, setValidMessage] = useState({
    username: {
      invalid: false,
      message: "",
    },
    email: {
      invalid: false,
      message: "",
    },
    password: {
      invalid: false,
      message: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {});

  const handleSignup = async (event) => {
    event.preventDefault();
    setValidMessage({
      username: {
        invalid: false,
        message: "",
      },
      email: {
        invalid: false,
        message: "",
      },
      password: {
        invalid: false,
        message: "",
      },
    });

    //validate
    if (username.length < 3 || username.length > 20) {
      setValidMessage((prev) => ({
        ...prev,
        username: {
          invalid: true,
          message: "Username phải có độ dài ít nhất 3 và không quá 20!",
        },
      }));
    }

    if (password.length < 6 || password.length > 40) {
      setValidMessage((prev) => ({
        ...prev,
        password: {
          invalid: true,
          message: "Mật khẩu phải có độ dài từ 6 đến 40!",
        },
      }));
    }

    const response = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, role: [{ id: 1 }], password }),
    });

    if (response.ok) {
      // const data = await response.json();
      const response1 = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data1 = await response1.json();
      if (response1.ok) {
        localStorage.setItem("accessToken", data1.accessToken);
        localStorage.setItem("tokenType", data1.tokenType);
        localStorage.setItem("id", data1.id);
        localStorage.setItem("roles", data1.roles);
        localStorage.setItem("email", data1.email);
        localStorage.setItem("username", data1.username);
        localStorage.setItem("isDeclared", data1.isDeclared);

        navigate("/home", { replace: true });
      } else {
        alert(data1.message);
      }
    } else {
      const data = await response.json();
      if (data.message === "USERNAME_EXIST") {
        setValidMessage((prev) => ({
          ...prev,
          username: {
            invalid: true,
            message: "Username đã tồn tại, mời nhập email khác!",
          },
        }));
      } else if (data.message === "EMAIL_EXIST") {
        setValidMessage((prev) => ({
          ...prev,
          email: {
            invalid: true,
            message: "email đã tồn tại, mời nhập email khác!",
          },
        }));
      } else {
        alert("Hệ thống gặp sự cố, vui lòng thử lại!");
      }
      console.error("Signup failed:", data);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Đăng ký tài khoản</h4>
              <form
                className="needs-validation"
                onSubmit={handleSignup}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSignup(e);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    <RequiredSharp /> Tên đăng nhập:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validateMessage.username.invalid ? "is-invalid" : ""
                    }`}
                    id="username"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    {validateMessage.username.message}
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label has-validation">
                    <RequiredSharp /> Email:
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      validateMessage.email.invalid ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="Nhập email"
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    {validateMessage.email.message}
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
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    {validateMessage.password.message}
                  </div>
                </div>
                <div>
                  Bạn đã có <a href="/login">tài khoản!</a>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-3 fs-5"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
