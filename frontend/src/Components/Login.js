import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css';


const Login = () => {
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.4)), url(${process.env.PUBLIC_URL}/Images/login.jpeg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
     // Set the height of the container if needed
  };
  
  
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
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
    <div className='login-container'>
    <div className='top-bar'>
    <img src="/Images/logo2.png" style={{ width: '105px', height: '40px', alignItems: 'center', marginLeft: '10px'}} alt="Logo" />
    </div>
    <div className='content-bar' style={backgroundStyle}>
        <div className='text-content'>
            <p>Touch for </p>
            <p>Effortless </p>
            <p>Attendance Tracking</p>
            <p style={{fontSize: '14px', color: 'black'}}>Experience a new era in attendance management with our cutting-edge fingerprint technology. 
              Our system eliminates the hassle of traditional methods, allowing users to effortlessly mark their 
              presence with a simple touch. </p>
        </div>

        <div className='login-form form_container'>
        <form onSubmit={handleSubmit} >
                <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
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
                <button type="submit">Submit</button>
                <span>
                Forgot password?
                </span>
            </form>
        </div>
    </div>
</div>
  );
};

export default Login;

