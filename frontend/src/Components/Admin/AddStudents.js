import { Select } from "antd";
import axios from "axios";
import { ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { LuFingerprint } from "react-icons/lu";
import { fireDb } from "../../firebase";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";
import "./Admin.css";

const Student = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("lecturer");
  const [fullName, setfullName] = useState("");
  const [depName, setdepName] = useState("");
  const [regNo, setregNo] = useState("");
  const [batch, setbatch] = useState("");
  const [fingerprintID, setfingerprintID] = useState("");
  const [image, setimage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [stuusers, setStuusers] = useState([]);
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [imageMessage, setimageMessage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/departments/getalldep")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments", error);
      });
  }, [departments]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/users/getstuusers")
      .then((response) => {
        setStuusers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Students", error);
      });
  }, [stuusers]);

  

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimage(reader.result);
    };
  };
  const enrollFingerprint = async () => {
    try {
      // Fetch existing student users from MongoDB
      const existingUsersResponse = await axios.get(
        "http://localhost:8070/api/users/getstuusers"
      );
      const existingUsers = existingUsersResponse.data;

      // Extract existing fingerprint IDs from fetched users
      const existingFingerprintIDs = existingUsers.map(
        (user) => user.fingerprintID
      );

      // Check if entered fingerprint ID already exists
      if (existingFingerprintIDs.includes(fingerprintID)) {
        setMessage("Fingerprint ID already exists!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        return;
      }

      // If fingerprint ID does not exist, proceed to enroll in Firebase
      set(ref(fireDb, "FingerprintData/"), {
        stuRegNo: regNo,
        stuFingerprintID: fingerprintID,
      });
      set(ref(fireDb, "State/"), {
        arduinoState: "1",
      });

      setSMessage("Fingerprint enrolled successfully!");
      setTimeout(() => {
        setSMessage(null);
      }, 3000);
    } catch (error) {
      setMessage("Failed to enroll fingerprint!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const submitHandler = (e) => {
    try {
      e.preventDefault();
      axios
        .post("http://localhost:8070/api/users/regstu", {
          userName,
          password,
          role,
          fullName,
          depName,
          regNo,
          fingerprintID,
          batch,
          image,
        })
        .then((response) => {
          if (response != null) {
            setSMessage("Student Added successfully!");
            setTimeout(() => {
              setSMessage(null);
            }, 3000);
          } else {
            setMessage("Student Adding Unsuccessful!");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error adding students", error);
        });
    } catch (error) {
      setMessage("Failed to add Student!");
    }
  };

  const resetHandler = () => {
    setfullName("");
    setregNo("");
    setuserName("");
    setpassword("");
    setfingerprintID("");
    setbatch("");
    setimage("/Images/profile.webp");
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
                <img
                  src={image ? image : "/Images/profile.webp"}
                  alt="Profile"
                />
              </div>
            </div>
            <div >
              <button
                onClick={enrollFingerprint}
                style={{ marginBottom: "25px", marginTop: "50px", marginLeft:'5px' }}
                className="btn btn-primary"
              >
                <LuFingerprint style={{fontSize:'20px'}}/>  Enroll Fingerprint
              </button>
            </div>
          </div>
          <div>
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {smessage && <SuccessMessage variant="success">{smessage}</SuccessMessage>}
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
                  <label>Department Name</label><br/>
                  <Select
                    value={depName}
                    onChange={(value) => setdepName(value)}
                    placeholder="Select department"
                    style={{ width: "520px" , height:'40px'}}
                  >
                    {departments.map((department) => (
                      <Select.Option
                        key={department._id}
                        value={department.depName}
                        style={{ width: "520px" , height:'40px'}}
                      >
                        {department.depName}
                      </Select.Option>
                    ))}
                  </Select>
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
                    style={{ marginRight: "25px", marginLeft: "5px" , width:'75px'}}
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                  <button
                    
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "gray",  marginRight: "25px",  width:'75px'}}
                    onClick={resetHandler}
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
          {
            <div className="table-design">
              <table className="table">
                <thead style={{ backgroundColor: "#dfeaf5" }}>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Registration Number</th>
                    <th scope="col">Department</th>
                    <th scope="col">Batch</th>
                  </tr>
                </thead>
                <tbody>
                  {stuusers.map((student) => (
                    <tr key={student._id}>
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
          }
        </div>
      </div>
    </div>
  );
};

export default Student;
