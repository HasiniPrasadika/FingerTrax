import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listStuUsers, registerstu } from "../../actions/userActions";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import "./Admin.css";

import { ref, set } from "firebase/database";
import { fireDb } from "../../firebase";






const Student = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("lecturer");
  const [fullName, setfullName] = useState("");
  const [depName, setdepName] = useState("");
  const [regNo, setregNo] = useState("");
  const [batch, setbatch] = useState("");
  const [fingerprintID, setfingerprintID] = useState("");
  const [image, setimage] = useState(
    ""
  );

  
  const stuuserList = useSelector((state) => state.stuuserList);
  const {stuloading, stuerror, stuusers} = stuuserList;

  useEffect(() => {
    dispatch(listStuUsers());
  }, [dispatch]);

  const idData = {
    stuRegNo: regNo,
    stuFingerprintID: fingerprintID,
  }

  const [message, setMessage] = useState(null);
  const [imageMessage, setimageMessage] = useState(null);

  const stuUserRegister = useSelector((state) => state.stuUserRegister);
  const { loading, error, userInfo } = stuUserRegister;

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

    dispatch(registerstu(userName, password, role, fullName, depName, regNo,fingerprintID, batch, image));
  };

  

  const enrollFingerprint = async () => {
    try {
      
      set(ref(fireDb, 'FingerprintData/'), {
        stuRegNo: regNo,
        stuFingerprintID: fingerprintID
      })
      set(ref(fireDb, 'State/'), {
        arduinoState: "1"
      })
      
      setMessage("Fingerprint enrolled successfully");
    } catch (error) {
      setMessage("Failed to enroll fingerprint");
      console.error(error);
    }
  };
  

  return (
    <div className="lecture-container" style={{ overflowX: "auto" }}>
      <div className="lecture-second-container" style={{ overflowX: "auto" }}>
        <div>
          <span style={{ opacity: "0.8", padding: "10px", fontSize: "12px" }}>
            <GoTriangleRight />
            Student
          </span>
        </div>
        <div className="lecture-details">
          <div className="lecture-photo-area">
            <h3 style={{ marginBottom: "25px", marginTop: "50px" }}>
              Add a Student
            </h3>
            <div className="profile-photo-preview">
              <div style={{ position: "relative", display: "inline-block" }}>
                
                <img src={image ? image : '/Images/profile.webp'} alt="Profile" />
                
              </div>
            </div>
            <div>

            <button onClick={enrollFingerprint} style={{ marginBottom: "25px", marginTop: "50px" }} className="btn btn-primary" >

                  Enroll Fingerprint
                </button>
              
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
                  <label>Fingerprint ID</label>
                  <input
                    type="text"
                    value={fingerprintID}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setfingerprintID(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label>Batch</label>
                  <input
                    type="text"
                    value={batch}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setbatch(e.target.value)}
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
                {/* <div className="form-group">
                  <label htmlFor="inputState">Module</label>
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
          <h3 style={{ marginBottom: "20px" }}>List of Students</h3>
          {stuloading ? (
            <Loading />
          ) : stuerror ? (
            <ErrorMessage message={stuerror} />
          ) : (
            <div className='table-design'> 
            <table className="table">
              <thead style={{backgroundColor:'#dfeaf5'}}>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Registration Number</th>
                  <th scope="col">Department</th>
                  <th scope="col">Batch</th>
                </tr>
              </thead>
              <tbody>
                {stuusers.map((student, index) => (
                  <tr key={index}>
                    <td>{student.fullName}</td>
                    <td>{student.userName}</td>
                    <td>{student.regNo}</td>
                    <td>{student.depName}</td>
                    <td>{student.batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student;
