import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css';


const Login = () => {
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/Images/2.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
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
    <div className='top-bar'></div>
    <div className='content-bar' style={backgroundStyle}>
        <div className='text-content'>
            <p>Touch for </p>
            <p>Effortless </p>
            <p>Attendance Tracking</p>
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
                Already have an account?
                </span>
            </form>
        </div>
    </div>
</div>
  );
};

export default Login;