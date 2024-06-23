import React, { useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { GoTriangleRight } from "react-icons/go";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { FaTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";
import "./Admin Styles/AddLecturer.css";
import "./Admin Styles/AddDepartment.css";

const AddLecturer = () => {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("lecturer");
  const [fullName, setfullName] = useState("");
  const [depName, setdepName] = useState("");
  const [regNo, setregNo] = useState("");
  const [image, setimage] = useState("");
  const [departments, setDepartments] = useState([]);
  const [email, setEmail] = useState("");
  const [lecusers, setLecusers] = useState([]);
  const [filteredLecusers, setFilteredLecusers] = useState([]);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredLecusers.length / itemsPerPage);
  const [editMode, setEditMode] = useState(false); // To track add/edit mode
  const [currentLecturerID, setCurrentLecturerID] = useState(null);

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
    setdepName("");
    setpassword("");
    setimage("");
    setEmail("");
    setEditMode(false); // Reset edit mode
    setCurrentLecturerID(null);
  };
  const editLecturer = (lecturer) => {
    setfullName(lecturer.fullName);
    setregNo(lecturer.regNo);
    setuserName(lecturer.userName);
    setpassword("");
    setdepName(lecturer.depName);
    setimage(lecturer.image.url);
    setEmail(lecturer.email);
    setEditMode(true); // Switch to edit mode
    setCurrentLecturerID(lecturer._id); // Set the ID of the lecturer being edited
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
        image: image || "",
        email,
      };

      // Include image in the payload if it's not the default value
      // if (image !== "/Images/profile.webp") {
      //   requestData.image = image;
      // }

      if (editMode) {
        // If in edit mode, update the existing lecturer
        if (!validateEmail(email)) {
          setMessage("Invalid email address");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          return;
        }
        if (password) {
          setMessage("You cannot Change the Password!");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        } else {
          axios
            .put(
              `http://localhost:8070/api/users/updateuser/${currentLecturerID}`,
              requestData
            )
            .then((response) => {
              setSMessage("Lecturer updated successfully!");
              setTimeout(() => {
                setSMessage(null);
              }, 3000);
              resetHandler();
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                setMessage("Username already exists");
              } else {
                setMessage("Failed to update Lecturer!");
              }
              setTimeout(() => {
                setMessage(null);
              }, 3000);
            });
        }
      } else {
        // If not in edit mode, add a new lecturer
        if (!fullName || !userName || !password || !depName || !regNo || !email) {
          setMessage(
            "You have to provide all the lecturer details except profile image!"
          );
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          return;
        }
        if (!validateEmail(email)) {
          setMessage("Invalid email address");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          return;
        }
        axios
          .post("http://localhost:8070/api/users/reglec", requestData)
          .then((response) => {
            setSMessage("Lecturer added successfully!");
            setTimeout(() => {
              setSMessage(null);
            }, 3000);
            resetHandler();
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              setMessage("Username already exists");
            } else {
              setMessage("Failed to add Lecturer!");
            }
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
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
        .post("http://localhost:8070/api/users/myd", { id }) // Include the id in the URL
        .then((response) => {
          setSMessage("Lecturer Deleted successfully!");
          setTimeout(() => {
            setSMessage(null);
          }, 3000);
          // Update the lecturer list
          setLecusers(lecusers.filter((lecturer) => lecturer._id !== id));
          setFilteredLecusers(
            filteredLecusers.filter((lecturer) => lecturer._id !== id)
          );
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
    <div className="addlec">
      <div className="add_lecturer-container">
        <div className="lec-navigate">
          <span>
            <GoTriangleRight />
          </span>
          Lecturer
        </div>

        <div className="lecturer-details">
          <div className="lecture-photo-area">
            <h3 className="photo-area-name">Add a Lecturer</h3>

            <img
              src={image ? image : "/Images/profile.webp"}
              alt="Profile"
              className="profile-photo-preview"
            />
          </div>
          <div className="lecturer-add-form">
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {smessage && (
              <SuccessMessage variant="success">{smessage}</SuccessMessage>
            )}
            <form
              onSubmit={submitHandler}
              style={{ margin: "2% 10% 2% 10%", width: "80%" }}
            >
              <div className="form-group row">
                <label
                  htmlFor="fullName"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Full Name :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    placeholder="FullName"
                    onChange={(e) => setfullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="userName"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Username :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    value={userName}
                    placeholder="Userame"
                    onChange={(e) => setuserName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="password"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Password :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="email"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Email :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="depName"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Department Name :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <Select
                    value={depName}
                    onChange={(value) => setdepName(value)}
                    placeholder="Select department"
                    style={{ width: "100%" }}
                  >
                    {departments.map((department) => (
                      <Select.Option
                        key={department._id}
                        value={department.depName}
                        style={{ width: "520px", height: "40px" }}
                      >
                        {department.depName}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="regNo"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Registration Number :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="text"
                    className="form-control"
                    id="regNo"
                    name="regNo"
                    value={regNo}
                    placeholder="Registration Number"
                    onChange={(e) => setregNo(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="image"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Profile Image :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleImage}
                  />
                </div>
              </div>
              <div
                className="form-group row"
                style={{ justifyContent: "center" }}
              >
                <button
                  type="submit"
                  className="btn btn-primary dep-form-hor"
                  onClick={submitHandler}
                >
                  {editMode ? "Edit" : "Add"}
                </button>

                <button
                  className="btn btn-primary dep-form-hor"
                  onClick={resetHandler}
                  style={{ backgroundColor: "grey" }}
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="dep-topic">
          <span>List of Lecturers</span>
        </div>
        <div className="dep-topic">
          <input
            type="text"
            placeholder="Search by Registration Number eg: lecxxx"
            value={searchRegNo}
            onChange={handleSearch}
            className="form-control"
            style={{ width: "320px" }}
          />
        </div>
        <div className="dep-table-wrapper">
          <table className="dep-add-table">
            <thead style={{ backgroundColor: "#dfeaf5", borderRadius: 15 }}>
              <tr>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>
                  #
                </th>
                <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                  Full Name
                </th>
                <th scope="col" style={{ width: "25px" }}>
                  Department
                </th>
                <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                  Username
                </th>
                <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                  Registration No:
                </th>
                <th scope="col" style={{ width: "10px", textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedLecturers.map((lecuser, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{lecuser.fullName}</td>
                  <td>{lecuser.depName}</td>
                  <td style={{ textAlign: "center" }}>{lecuser.userName}</td>
                  <td style={{ textAlign: "center" }}>{lecuser.regNo}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-danger dep-del"
                      onClick={() => deleteLecturer(lecuser._id)}
                    >
                      <RiDeleteBin6Line
                        className="add-dep-del"
                        style={{ fontSize: "20px" }}
                      />
                    </button>
                    <button
                      className="btn btn-primary dep-edit"
                      onClick={() => editLecturer(lecuser)}
                    >
                      <RiEdit2Line
                        className="add-dep-edit"
                        style={{ fontSize: "20px" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination" style={{ marginLeft: "10px" }}>
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
  );
};

export default AddLecturer;
