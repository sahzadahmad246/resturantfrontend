import React, { useState } from "react";
import "../CSS/Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import LoginImg from "../Images/signupImg.png";
import { useAuth } from "../store/auth";
import Alert from "@mui/material/Alert";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginSuccMessage, setLoginSuccMessage] = useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);

  const navigate = useNavigate();

  const { storeDataInLS } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const resData = await res.json();
        setLoginSuccMessage(resData.message);
        // console.log(resData)
        storeDataInLS(resData.token);
        setLoginSuccess(true);
        setLoginError(false);
        setTimeout(() => {
          setLoginSuccess(false);
        }, 3000);
        setTimeout(() => {
          navigate("/");
        }, 1000);
       
      } else if (res.status === 401) {
        const loginErrorData = await res.json();
        setLoginErrorMessage(loginErrorData.message);
        setLoginError(true);
        setLoginSuccess(false);
        setTimeout(() => {
          setLoginError(false);
        }, 3000);
        console.log("Invalid credentials");
      } else {
        throw new Error("Error during login");
      }
    } catch (error) {
      setLoginError(true);
      setLoginSuccess(false);
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="alert-message">
        {loginSuccess && (
          <Alert
            severity="success"
            className="fadeIn"
            style={{ border: "1px solid green" }}
          >
            {loginSuccMessage}
          </Alert>
        )}
        {loginError && (
          <Alert severity="error" className="fadeIn" style={{ border: "1px solid #ec740b" }}>
            {loginErrorMessage}
          </Alert>
        )}
      </div>
      <section className="login-box">
        <div className="login-container container">
          <div className="login-left">
            <div className="login-img container">
              <img src={LoginImg} alt="img" />
            </div>
          </div>
          <div className="login-right">
            
            <div className="login-top">
              <div className="login-header">
                <h4>Login</h4>
              </div>
              <div className="loginClose">
                <span class="material-symbols-outlined">close</span>
              </div>
            </div>

            <form
              method="POST"
              className="login-form"
              onSubmit={handleFormSubmit}
            >
              <div className="login-element">
              <i class="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  className="border-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login-element">
              <i class="fa-solid fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter a password"
                  className="border-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login-btn-container">
                <button className="login-btn" type="submit">
                  Login
                </button>
              </div>
              <p className="fs-9">
                <NavLink className="navbar-brand" to="/sign-up">
                  or create an account
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
