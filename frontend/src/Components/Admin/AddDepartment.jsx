import axios from "axios";
import React, { useState, useEffect } from "react";
import { GoTriangleRight } from "react-icons/go";
import { FaTrashAlt,FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ErrorMessage from "../../Components/ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";
import "./Admin Styles/AddDepartment.css";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";

const AddDepartment = () => {
  const [depCode, setdepCode] = useState("");
  const [depName, setdepName] = useState("");
  const [noOfStu, setnoOfStu] = useState("");
  const [noOfLec, setnoOfLec] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [editMode, setEditMode] = useState(false); // To track add/edit mode
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(departments.length / itemsPerPage);


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

  const submitHandler = (e) => {
    e.preventDefault();

    if (!depCode || !depName || !noOfStu || !noOfLec) {
      setMessage("Please enter all the department details before submitting.");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }

    if (editMode) {
      // If in edit mode, update the existing department
      axios
        .put(`http://localhost:8070/api/departments/updatedep/${currentDepartmentId}`, {
          depCode,
          depName,
          noOfStu,
          noOfLec,
        })
        .then((response) => {
          setSMessage("Department updated successfully!");
          setTimeout(() => {
            setSMessage(null);
          }, 3000);
          resetHandler();
        })
        .catch((error) => {
          setMessage("Failed to update Department!");
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    } else {
      // If not in edit mode, add a new department
      axios
        .post("http://localhost:8070/api/departments/adddep", {
          depCode,
          depName,
          noOfStu,
          noOfLec,
        })
        .then((response) => {
          setSMessage("Department added successfully!");
          setTimeout(() => {
            setSMessage(null);
          }, 3000);
          resetHandler();
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setMessage("Department already exists");
          } else {
            setMessage("Failed to add Department!");
          }
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };
  const resetHandler = () => {
    setdepCode("");
    setdepName("");
    setnoOfStu("");
    setnoOfLec("");
    setEditMode(false); // Reset edit mode
    setCurrentDepartmentId(null); // Reset current department ID
  };

  const editDepartment = (department) => {
    setdepCode(department.depCode);
    setdepName(department.depName);
    setnoOfStu(department.noOfStu);
    setnoOfLec(department.noOfLec);
    setEditMode(true); // Switch to edit mode
    setCurrentDepartmentId(department._id); // Set the ID of the department being edited
  };
  const deleteDepartment = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      axios
        .post("http://localhost:8070/api/departments/depdel", { id }) // Include the id in the URL
        .then((response) => {
          setSMessage("Department Deleted successfully!");
          setTimeout(() => {
            setSMessage(null);
          }, 3000);
          // Update the lecturer list
        })
        .catch((error) => {
          console.error("Error deleting department", error);
          setMessage("Failed to delete Department!");
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

  const paginatedDepartments = departments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="adddep">
      <div className="department-container">
      <div className="dep-navigate">
        <span>
          <GoTriangleRight />
        </span>
        Department
      </div>
      <div className="dep-topic">
        <span>Add Departments</span>
      </div>
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {smessage && (
        <SuccessMessage variant="success">{smessage}</SuccessMessage>
      )}
      <div className="dep-details">
        <form onSubmit={submitHandler} className="form-style">
          <div className="form-group row">
            <label
              htmlFor="departmentCode"
              className="col-sm-4 col-form-label dep-form-hor"
            >
              Department Code :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <input
                type="text"
                className="form-control"
                id="departmentCode"
                name="departmentCode"
                value={depCode}
                placeholder="Department Code"
                onChange={(e) => setdepCode(e.target.value)}
              />
             
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="departmentName"
              className="col-sm-4 col-form-label dep-form-hor"
            >
              Department Name :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <input
                type="text"
                className="form-control"
                id="departmentName"
                name="departmentName"
                value={depName}
                placeholder="Department Name"
                onChange={(e) => setdepName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="numberOfLecturers"
              className="col-sm-4 col-form-label dep-form-hor"
            >
              No. of Lecturers :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <input
                type="text"
                className="form-control"
                id="numberOfLecturers"
                name="numberOfLecturers"
                value={noOfLec}
                placeholder="Number of Lecturers"
                onChange={(e) => setnoOfLec(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="numberOfStudents"
              className="col-sm-4 col-form-label dep-form-hor"
            >
              No. of Students :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <input
                type="text"
                className="form-control"
                id="numberOfStudents"
                name="numberOfStudents"
                 placeholder="Number of Students"
                value={noOfStu}
                onChange={(e) => setnoOfStu(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row" style={{ justifyContent: "center" }}>
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
      <div className="dep-topic">
        <span>List of Departments</span>
      </div>

      <div className="dep-table-wrapper">
        <table className="dep-add-table">
          <thead style={{ backgroundColor: "#dfeaf5", borderRadius: 15 }}>
            <tr>
              <th scope="col" style={{ width: "5px", textAlign: "center" }}>
                #
              </th>
              <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                Department Code
              </th>
              <th scope="col" style={{ width: "25px" }}>
                Department Name
              </th>
              <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                No of Students
              </th>
              <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                No of Lecturers
              </th>
              <th scope="col" style={{ width: "10px", textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedDepartments.map((department, index) => (
              <tr key={index}>
                <th style={{ textAlign: "center" }}>{index + 1}</th>
                <td style={{ textAlign: "center" }}>{department.depCode}</td>
                <td>{department.depName}</td>
                <td style={{ textAlign: "center" }}>{department.noOfStu}</td>
                <td style={{ textAlign: "center" }}>{department.noOfLec}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-danger dep-del"
                    onClick={() => deleteDepartment(department._id)}
                  >
                    <RiDeleteBin6Line
                      className="add-dep-del"
                      style={{ fontSize: "20px" }}
                    />
                  </button>
                  <button
                    className="btn btn-primary dep-edit"
                    onClick={() => editDepartment(department)}
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
    
  );
};

export default AddDepartment;
