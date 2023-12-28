import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
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
      console.log("Submit button clicked");
      const { data } = await axios.post(
        "http://localhost:8070/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        console.log("Navigate to Home page");
        navigate("/");
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="rowone">
      <div>
        <p>Touch for</p>
        <p>Effortless</p>
        <p>Attendance Tracking</p>
      </div>

      <div className="form_container">
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
