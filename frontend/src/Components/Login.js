import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const Login = () => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.4)), url(${process.env.PUBLIC_URL}/Images/login.jpeg)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8070/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message, role } = data;
      if (success) {
        handleSuccess(message);
        switch (role) {
          case "admin":
            navigate("/");
            break;
          case "lecturer":
            navigate("/lecturerdashboard");
            break;
          case "student":
            navigate("/studentdashboard");
            break;
          default:
            break;
        }
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      username: "",
      password: "",
    });
  };
  return (
    <div className="login-container">
      <div className="top-bar">
        <img
          src="/Images/logo2.png"
          style={{
            width: "137px",
            height: "55px",
            alignItems: "center",
            marginLeft: "20px",
          }}
          alt="Logo"
        />
      </div>
      <div className="content-bar" style={backgroundStyle}>
        <div className="text-content">
          <p>Touch for </p>
          <p>Effortless </p>
          <p>Attendance Tracking</p>
          <p style={{ fontSize: "14px", color: "black", marginTop: "20px" }}>
            Experience a new era in attendance management with our cutting-edge
            fingerprint technology. Our system eliminates the hassle of
            traditional methods, allowing users to effortlessly mark their
            presence with a simple touch.{" "}
          </p>
        </div>

        <div className="login-form form_container">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={handleOnChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />
            </div>
            <button type="submit">Login</button>
            <span style={{ color: "blue" }}>
              Forgot password?<Link to={"/signup"}>Login</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
