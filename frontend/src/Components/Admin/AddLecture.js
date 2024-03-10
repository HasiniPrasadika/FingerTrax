import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import { registerlec } from "../../actions/userActions";
import "./Admin.css";
import {listLecUsers} from "../../actions/userActions";



const Lecture = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("lecturer");
  const [fullName, setfullName] = useState("");
  const [depName, setdepName] = useState("");
  const [regNo, setregNo] = useState("");
  const [image, setimage] = useState(
    ""
  );

  const lecuserList = useSelector((state) => state.lecuserList);
  const { lecloading, lecerror, lecusers } = lecuserList;

  useEffect(() => {
    dispatch(listLecUsers());
  }, [dispatch]);

  const [message, setMessage] = useState(null);
  const [imageMessage, setimageMessage] = useState(null);

  

  const lecUserRegister = useSelector((state) => state.lecUserRegister);
  const { loading, error, userInfo } = lecUserRegister;

  const handleImage = (e) =>{
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  }

  const setFileToBase = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      setimage(reader.result);
    }
  }

  
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(registerlec(userName, password, role, fullName, depName, regNo, image));
  };


  return (
    <div className="lecture-container">
      <div className="lecture-second-container">
        <div>
          <span style={{ opacity: "0.8", padding: "10px", fontSize: "12px" }}>
            <GoTriangleRight />
            Lecturer
          </span>
        </div>
        <div className="lecture-details">
          <div className="lecture-photo-area">
            <h3 style={{ marginBottom: "30px" }}>Add a Lecturer</h3>
            <div className="profile-photo-preview">
              <div style={{ position: "relative", display: "inline-block" }}>
                <img src={image} alt="Profile" />
              </div>
            </div>
          </div>
          <div>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}
            <form onSubmit={submitHandler}>
              <div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    className="form-control"
                    placeholder="FullName"
                    onChange={(e) => setfullName(e.target.value)}
                  />
                </div>
                <div className="form-row" style={{ marginBottom: 10 }}>
                  <div className="form-group col-md-6">
                    <label>Username</label>
                    <input
                      type="text"
                      value={userName}
                      className="form-control"
                      placeholder="Username"
                      onChange={(e) => setuserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label>Department Name</label>
                  <input
                    type="text"
                    value={depName}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setdepName(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label>Registration Number</label>
                  <input
                    type="text"
                    value={regNo}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setregNo(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                {imageMessage && (
            <ErrorMessage variant="danger">{imageMessage}</ErrorMessage>
          )}
                  <label>Upload Profile Picture</label>
                  <input
                    type="file"
                  
                    className="form-control"
                    placeholder="Name"
                    onChange={handleImage}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="inputState">Department</label>
                  <select id="inputState" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div> */}
                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginRight: "25px", marginLeft: "5px" }}
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "gray" }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="lecturer-list">
          <h3 style={{ marginBottom: "20px" }}>List of Lecturers</h3>
          
      <ul>
        {lecloading ? (
          <Loading/>
        ) : lecerror ? (
          <ErrorMessage message = {lecerror} />
        ) : (lecusers.map((lecturer, index) => (
          <li key={index}>
            <p>Full Name: {lecturer.fullName}</p>
            <p>Username: {lecturer.userName}</p>
            <p>Department: {lecturer.depName}</p>
          </li>
        )))}
        
      </ul>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
