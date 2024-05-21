import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { GoTriangleRight } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTrashAlt ,FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";
import "./Admin.css";

const Lecture = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("lecturer");
  const [fullName, setfullName] = useState("");
  const [depName, setdepName] = useState("");
  const [regNo, setregNo] = useState("");
  const [image, setimage] = useState("/Images/profile.webp");
  const [departments, setDepartments] = useState([]);
  const [lecusers, setLecusers] = useState([]);
  const [filteredLecusers, setFilteredLecusers] = useState([]);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredLecusers.length / itemsPerPage);

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
        setFilteredLecusers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Lecturers", error);
      });
  }, []);

  const lecUserRegister = useSelector((state) => state.lecUserRegister);
  const { loading, error, userInfo } = lecUserRegister;

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
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
            setSMessage("Lecturer Added successfully!");
            setTimeout(() => {
              setSMessage(null);
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

  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchRegNo(searchTerm);

    if (searchTerm) {
      const filtered = lecusers.filter((lecturer) =>
        lecturer.regNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLecusers(filtered);
    } else {
      setFilteredLecusers(lecusers);
    }
  };

  const deleteLecturer = (id) => {
    if (window.confirm("Are you sure you want to delete this lecturer?")) {
      
      axios
        .post("http://localhost:8070/api/users/myd", {id}) // Include the id in the URL
        .then((response) => {
          setSMessage("Lecturer Deleted successfully!");
          setTimeout(() => {
            setSMessage(null);
          }, 3000);
          // Update the lecturer list
          setLecusers(lecusers.filter((lecturer) => lecturer._id !== id));
          setFilteredLecusers(filteredLecusers.filter((lecturer) => lecturer._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting lecturer", error);
          setMessage("Failed to delete Lecturer!");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const paginatedLecturers = filteredLecusers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <h3 style={{ marginBottom: "30px", marginTop: "50px" }}>Add a Lecturer</h3>
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
                <div className="form-group">
                  <label>Registration Number</label>
                  <input
                    type="text"
                    value={regNo}
                    className="form-control"
                    placeholder="Registration Number"
                    onChange={(e) => setregNo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Profile Image</label>
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={handleImage}
                  />
                </div>
                <div style={{ marginTop: "30px", marginBottom: "20px" }}>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary"
                    onClick={resetHandler}
                    style={{ marginLeft: "20px" }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <div className="lecturer-list">
          <h3 style={{ marginBottom: "20px" }}>List of Lecturers</h3>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search by Registration Number eg: lecxxx"
              value={searchRegNo}
              onChange={handleSearch}
              className="form-control"
              style={{ width: "320px" }}
            />
          </div>
          <div className="table-design">
          <table className="table">
            <thead style={{ backgroundColor: "#dfeaf5" }}>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Department</th>
                <th scope="col">Username</th>
                <th scope="col">Registration Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLecturers.map((lecuser) => (
                <tr key={lecuser._id}>
                  <td>{lecuser.fullName}</td>
                  <td>{lecuser.depName}</td>
                  <td>{lecuser.userName}</td>
                  <td>{lecuser.regNo}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteLecturer(lecuser._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          </div>
          <div className="pagination" style={{marginLeft: "10px"}}>
            <button
              className="btn btn-primary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Lecture;
