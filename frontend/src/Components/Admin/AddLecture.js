import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import "./Admin.css";

const Lecture = () => {
  const dispatch = useDispatch();
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("lecturer");
  const [fullName, setfullName] = useState("");
  const [depName, setdepName] = useState("");
  const [regNo, setregNo] = useState("");
  const [image, setimage] = useState("/Images/profile.webp");
  const [departments, setDepartments] = useState([]);
  const [lecusers, setLecusers] = useState([]);
  const [message, setMessage] = useState(null);
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
      .get("http://localhost:8070/api/users/getlecusers")
      .then((response) => {
        setLecusers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Lecturers", error);
      });
  }, [lecusers]);

  const lecUserRegister = useSelector((state) => state.lecUserRegister);
  const { loading, error, userInfo } = lecUserRegister;

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
  const resetHandler = () => {
    setfullName("");
    setregNo("");
    setuserName("");
    setpassword("");
    setimage("/Images/profile.webp");
  };
  const submitHandler = (e) => {
    try {
      e.preventDefault();
      const requestData = {
        userName,
        password,
        role,
        fullName,
        depName,
        regNo,
      };
    
      // Include image in the payload if it's not the default value
      if (image !== "/Images/profile.webp") {
        requestData.image = image;
      }
      axios
        .post("http://localhost:8070/api/users/reglec", requestData)
        .then((response) => {
          if (response != null) {
            setMessage("Lecturer Added successfully!");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          } else {
            setMessage("Lecturer Adding Unsuccessful!");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error adding lecturers", error);
        });
    } catch (error) {
      setMessage("Failed to add Lecturer!");
    }

    // try{
    //   e.preventDefault();
    //   dispatch(
    //     registerlec(userName, password, role, fullName, depName, regNo, image)
    //   );
    //   setMessage("Lecturer Added successfully!");
    //   setTimeout(() => {
    //     setMessage(null);
    //   }, 3000);

    // } catch (error) {
    //   setMessage("Failed to add Lecturer!");
    //   setTimeout(() => {
    //     setMessage(null);
    //   }, 3000);
    // }
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
            <h3 style={{ marginBottom: "30px" , marginTop:"50px"}}>Add a Lecturer</h3>
            <div className="profile-photo-preview">
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={image ? image : "/Images/profile.webp"}
                  alt="Profile"
                />
              </div>
            </div>
          </div>
          <div>
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}

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
                <div className="form-group " >
                  <label>Department Name</label><br/>
                  <div >
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
                        style={{ width: "520px" ,height:'40px'}}>
                        {department.depName}
                      </Select.Option>
                    ))}
                  </Select>
                  </div>
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
                    style={{marginBottom:'30px'}}
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
          <h3 style={{ marginBottom: "20px" }}>List of Lecturers</h3>

          {
            <div className="table-design">
              <table className="table">
                <thead style={{ backgroundColor: "#dfeaf5" }}>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Registration Number</th>
                    <th scope="col">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {lecusers.map((lecturer) => (
                    <tr key={lecturer._id}>
                      <td>{lecturer.fullName}</td>
                      <td>{lecturer.userName}</td>
                      <td>{lecturer.regNo}</td>
                      <td>{lecturer.depName}</td>
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

export default Lecture;
