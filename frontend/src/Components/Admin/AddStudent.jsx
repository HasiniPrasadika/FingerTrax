import { Select } from "antd";
import axios from "axios";
import { ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { LuFingerprint } from "react-icons/lu";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import SuccessMessage from "../../Components/SuccessMessage";
import { fireDb } from "../../firebase";
import ErrorMessage from "../ErrorMessage";
import "./Admin Styles/AddLecturer.css";
import "./Admin Styles/AddStudent.css";

const AddStudent = () => {
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
  const [email, setEmail] = useState("");
  const [stuusers, setStuusers] = useState([]);
  const [filteredStuusers, setFilteredStuusers] = useState([]);
  const [searchRegNo, setSearchRegNo] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [imageMessage, setimageMessage] = useState(null);
  const [prevFingerID, setPrevFingerID] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredStuusers.length / itemsPerPage);
  const [editMode, setEditMode] = useState(false); // To track add/edit mode
  const [currentStudentID, setCurrentStudentID] = useState(null);

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
        setFilteredStuusers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Students", error);
      });
  }, []);

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

  const enrollFingerprint = async () => {
    try {
      const existingUsersResponse = await axios.get(
        "http://localhost:8070/api/users/getstuusers"
      );
      const existingUsers = existingUsersResponse.data;
      const existingFingerprintIDs = existingUsers.map(
        (user) => user.fingerprintID
      );

      if (existingFingerprintIDs.includes(fingerprintID)) {
        setMessage("Fingerprint ID already exists!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        return;
      }

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
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const submitHandler = (e) => {
    try {
      e.preventDefault();
      if (editMode) {
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
        } else if (prevFingerID !== fingerprintID) {
          setMessage("You cannot Change the Fingerprint ID!");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        } else {
          axios
            .put(
              `http://localhost:8070/api/users/updatestuuser/${currentStudentID}`,
              {
                userName,
                fullName,
                depName,
                regNo,
                batch,
                image: image || "",
              }
            )
            .then((response) => {
              setSMessage("Student updated successfully!");
              setTimeout(() => {
                setSMessage(null);
              }, 3000);
              resetHandler();
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                setMessage("Username already exists");
              } else {
                setMessage("Failed to update Student!");
              }
              setTimeout(() => {
                setMessage(null);
              }, 3000);
            });
        }
      } else {
        if (
          !fullName ||
          !userName ||
          !password ||
          !depName ||
          !regNo ||
          !fingerprintID ||
          !batch
        ) {
          setMessage(
            "You have to provide all the student details except profile image!"
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
          .post("http://localhost:8070/api/users/regstu", {
            userName,
            password,
            role,
            fullName,
            depName,
            regNo,
            fingerprintID,
            batch,
            image: image || "",
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
            if (error.response && error.response.status === 404) {
              setMessage("Username already exists");
            } else {
              setMessage("Failed to add Student!");
            }
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
    } catch (error) {
      setMessage("Failed to add Student!");
    }
  };

  const resetHandler = () => {
    setfullName("");
    setregNo("");
    setuserName("");
    setpassword("");
    setdepName("");
    setfingerprintID("");
    setbatch("");
    setEmail("");
    setimage("");
    setPrevFingerID("");
    setEditMode(false); // Reset edit mode
    setCurrentStudentID(null);
  };
  const editStudent = (student) => {
    setfullName(student.fullName);
    setregNo(student.regNo);
    setuserName(student.userName);
    setpassword("");
    setfingerprintID(student.fingerprintID);
    setPrevFingerID(student.fingerprintID);
    setbatch(student.batch);
    setdepName(student.depName);
    setEmail(student.email);
    setimage(student.image.url);
    setEditMode(true); // Switch to edit mode
    setCurrentStudentID(student._id); // Set the ID of the lecturer being edited
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchRegNo(searchTerm);

    if (searchTerm) {
      const filtered = stuusers.filter((student) =>
        student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStuusers(filtered);
    } else {
      setFilteredStuusers(stuusers);
    }
  };
  const deleteStudent = (id, student) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .post("http://localhost:8070/api/users/myd", { id }) // Include the id in the URL
        .then((response) => {
          set(ref(fireDb, "FingerprintData/"), {
            stuRegNo: student.regNo,
            stuFingerprintID: student.fingerprintID,
          });
          set(ref(fireDb, "State/"), {
            arduinoState: "2",
          });
          setSMessage("Student Deleted successfully!");
          setTimeout(() => {
            setSMessage(null);
          }, 3000);
          // Update the lecturer list
          setStuusers(stuusers.filter((student) => student._id !== id));
          setFilteredStuusers(
            filteredStuusers.filter((student) => student._id !== id)
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

  const paginatedStudents = filteredStuusers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="addstu">
      <div className="add_student-container">
        <div className="lec-navigate">
          <span>
            <GoTriangleRight />
          </span>
          Student
        </div>
        <div className="lecturer-details">
          <div className="lecture-photo-area">
            <h3 className="photo-area-name">Add a Student</h3>
            <img
              src={image ? image : "/Images/profile.webp"}
              alt="Profile"
              className="profile-photo-preview"
            />
            <button
              onClick={enrollFingerprint}
              className="btn btn-primary fingerprint-enroll"
            >
              <LuFingerprint style={{
                marginTop:'5px', marginRight:'5px'
              }}/> Enroll Fingerprint
            </button>
          </div>
          <div className="lecturer-add-form">
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {smessage && (
              <SuccessMessage variant="success">{smessage}</SuccessMessage>
            )}
            <form
              onSubmit={submitHandler}
              className="form-style"
              style={{ margin: "2% 5% 2% 5%", width: "90%" }}
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
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    className="form-control"
                    placeholder="FullName"
                    onChange={(e) => setfullName(e.target.value)}
                  />
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
                  htmlFor="userName"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Username :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="text"
                    value={userName}
                    id="userName"
                    name="userName"
                    className="form-control"
                    placeholder="Username"
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
                    id="password"
                    name="password"
                    value={password}
                    className="form-control"
                    placeholder="Password"
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
                  htmlFor="fingerprintID"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Fingerprint ID :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="text"
                    id="fingerprintID"
                    name="fingerprintID"
                    value={fingerprintID}
                    className="form-control"
                    placeholder="Fingerprint ID"
                    onChange={(e) => setfingerprintID(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="batch"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Batch :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="text"
                    value={batch}
                    id="batch"
                    name="batch"
                    className="form-control"
                    placeholder="Batch"
                    onChange={(e) => setbatch(e.target.value)}
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
                style={{ justifyContent: "center"}}
              >
                <button
                  type="submit"
                  className="btn btn-primary dep-form-hor"
                  onClick={submitHandler}
                  style={{marginLeft:'130px'}}
                >
                  {editMode ? "Edit" : "Add"}
                </button>
                <button
                  className="btn btn-primary dep-form-hor"
                  onClick={resetHandler}
                  style={{ backgroundColor: "grey", borderBlockColor:'gray' }}
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="dep-topic">
          <span>List of Students</span>
        </div>

        <div className="dep-topic">
          <input
            type="text"
            placeholder="Search by Registration Number eg: stuxxx"
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
                <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                  Registration Number
                </th>
                <th scope="col" style={{ width: "25px" }}>
                  Department
                </th>
                <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                  Batch
                </th>
                <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                  Fingerprint ID
                </th>
                <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{student.fullName}</td>
                  <td style={{ textAlign: "center" }}>{student.regNo}</td>
                  <td>{student.depName}</td>
                  <td style={{ textAlign: "center" }}>{student.batch}</td>
                  <td style={{ textAlign: "center" }}>
                    {student.fingerprintID}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-danger dep-del"
                      onClick={() => deleteStudent(student._id, student)}
                    >
                      <RiDeleteBin6Line
                        className="add-dep-del"
                        style={{ fontSize: "20px" }}
                      />
                    </button>
                    <button
                      className="btn btn-primary dep-edit"
                      onClick={() => editStudent(student)}
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
        <div className="pagination" style={{ margin: "20px" }}>
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

export default AddStudent;
