import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import ErrorMessage from "../Components/ErrorMessage";
import { register } from "../Components/userActions";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("admin");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/admindashboard");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(register(userName, password, role));
  };

  // const handleOnChange = (e) => {
  //   const { name, value} = e.target;
  //   setInputValue({
  //     ...inputValue,
  //     [name]: value,
  //   });
  // };

  // const handleError = (err) =>
  //   toast.error(err, {
  //     position: "bottom-left",
  //   });
  
  // const handleSuccess = (msg) =>
  //   toast.success(msg, {
  //     position: "bottom-right",
  //   });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:8070/signup",
  //       {
  //         ...inputValue,
  //       },
  //       { withCredentials: true }
  //     );

  //     const { success, message } = data;
  //     if (success) {
  //       handleSuccess(message);
        
  //       switch (role) {
  //         case "admin":
  //           navigate("/");
  //           break;
  //         case "lecturer":
  //           navigate("/lecturerdashboard");
  //           break;
  //         case "student":
  //           navigate("/studentdashboard");
  //           break;
  //         default:
  //           break;
  //       }
  //     } else {
  //       handleError(message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setInputValue({
  //     ...inputValue,
  //     password: "",
  //     username: "",
  //     role: "", // Reset the role to default after signup
  //   });
  

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
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
          />
        </div>
        
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );

};
export default Signup;
