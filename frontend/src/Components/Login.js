import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import { login } from "../Components/userActions";
import { toast } from "react-toastify";
import "./Login.css";

function Login ({history}) {
  const navigate = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      switch (userInfo.role) {
        case "admin":
          history.push("/admindashboard");
          break;
        case "lecturer":
          history.push("/lecturerdashboard");
          break;
        case "student":
          history.push("/studentdashboard");
          break;
        default:
          break;
      }
      
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(userName, password));
    
  };

  // Function to handle input change
  

  // Function to handle form submission
  
  // Function to handle success toast and redirection based on user role
  

  // Function to handle error toast
  
  // Function to display toast messages
 

  return (
    <div className="login-container">
      <div className="top-bar">
        <img src="/Images/logo2.png" alt="Logo" className="img" />
      </div>
      <div className="content-bar">
        <div className="text-content">
          <p>Touch for </p>
          <p>Effortless </p>
          <p>Attendance Tracking</p>
          <p style={{ fontSize: "14px", color: "black", marginTop: "20px" }}>
            Experience a new era in attendance management with our cutting-edge
            fingerprint technology. Our system eliminates the hassle of
            traditional methods, allowing users to effortlessly mark their
            presence with a simple touch.
          </p>
        </div>

        <div className="form_container">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={userName}
                placeholder="Enter your username"
                onChange={(e) => setuserName(e.target.value)}
                required // Adding required attribute
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setpassword(e.target.value)}
                required // Adding required attribute
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
