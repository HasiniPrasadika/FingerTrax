import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoTriangleRight } from "react-icons/go";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import { FaTrashAlt,FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";
import "./Lecturer Styles/CreateModule.css";
import "../Admin/Admin Styles/AddDepartment.css";

const CreateModule = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [modCode, setmodCode] = useState("");
  const [modName, setmodName] = useState("");
  const [enrolKey, setenrolKey] = useState("");
  const [modCoordinator, setModCoordinator] = useState(userInfo.userName);
  const [semester, setSemester] = useState("");
  const [lecHours, setLecHours] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [modules, setModules] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [searchModuleCode, setSearchModuleCode] = useState("");

  const [currentModuleId, setCurrentModuleId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(modules.length / itemsPerPage);

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
      .get("http://localhost:8070/api/modules/getallmod")
      .then((response) => {
        const filteredModules = response.data.filter(
          (module) => module.modCoordinator.userName === userInfo.userName
        );
        setModules(filteredModules);
      })
      .catch((error) => {
        console.error("Error fetching modules", error);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!modCode || !modName || !enrolKey || !semester || !lecHours || !department) {
      setMessage("Please enter all the module details before submitting.");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }

    if(editMode){
      axios
      .put(`http://localhost:8070/api/modules/updatemod/${currentModuleId}`, {
        modCode,
        modName,
        enrolKey,
        semester,
        lecHours,
        department,
      })
      .then((response) => {
        setSMessage("Module updated successfully!");
        setTimeout(() => {
          setSMessage(null);
        }, 3000);
        resetHandler();
      })
      .catch((error) => {
        setMessage("Failed to update Module!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });

    }else{
      axios
        .post("http://localhost:8070/api/modules/addmod", {
          modCode,
          modName,
          enrolKey,
          modCoordinator,
          lecHours,
          department,
          semester,
        })
        .then((response) => {
          if (response != null) {
            setSMessage("Module Added successfully!");
            setTimeout(() => {
              setSMessage(null);
            }, 3000);
          } else {
            setMessage("Module Adding Unsuccessful!");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Error adding module", error);
        });

    }
    
    
  };
  const resetHandler = () => {
    setmodCode("");
    setmodName("");
    setenrolKey("");
    setLecHours("");
    setSemester("");
    setDepartment("");
    setEditMode(false);
    setCurrentModuleId(null);
  };
  const editModule = (module) => {
    setmodCode(module.modCode);
    setmodName(module.modName);
    setenrolKey(module.enrolKey);
    setLecHours(module.lecHours);
    setSemester(module.semester);
    setDepartment(module.department);
    setEditMode(true); // Switch to edit mode
    setCurrentModuleId(module._id); // Set the ID of the department being edited
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchModuleCode(searchTerm);

    if (searchTerm) {
      const filtered = modules.filter((module) =>
        module.modCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setModules(filtered);
    } else {
      setModules(modules);
    }
  };

  const deleteModule = (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      axios
        .post("http://localhost:8070/api/modules/moddel", { id }) // Include the id in the URL
        .then((response) => {
          setSMessage("Module Deleted successfully!");
          setTimeout(() => {
            setSMessage(null);
          }, 3000);
          // Update the lecturer list
          setModules(modules.filter((module) => module._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting module", error);
          setMessage("Failed to delete Module!");
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

  const paginatedModules = modules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="create-module-container">
      <div className="dep-navigate">
        <span>
          <GoTriangleRight />
        </span>
        Create Module
      </div>
      <div className="dep-topic">
        <span>Add Modules</span>
      </div>
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {smessage && (
        <SuccessMessage variant="success">{smessage}</SuccessMessage>
      )}
      <div className="dep-details">
        <form onSubmit={submitHandler} className="form-style">
          <div className="form-group row">
            <label
              htmlFor="modulecode"
              className="col-sm-4 col-form-label dep-form-hor"
            >
              Module Code :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <input
                type="text"
                className="form-control "
                id="modCode"
                name="modCode"
                value={modCode}
                placeholder="Module Code"
                onChange={(e) => setmodCode(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="modulename"
              className="col-sm-4 col-form-label dep-form-hor"
            >
              Module Name :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <input
                type="text"
                className="form-control"
                id="modName"
                name="modName"
                value={modName}
                placeholder="Module Name"
                onChange={(e) => setmodName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label
              htmlFor="enroll"
              className="col-sm-4 col-form-label dep-form-hor"
            >
              Enrollment Key :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <input
                type="text"
                className="form-control"
                id="enrolKey"
                name="enrolKey"
                value={enrolKey}
                placeholder="Enrollment Key"
                onChange={(e) => setenrolKey(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="semester"
              className="col-sm-4 col-form-label dep-form-hor"
            >
              Semester :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <Select
                value={semester}
                onChange={(value) => setSemester(value)}
                placeholder="Select semester"
                style={{ width: "100%" }}
              >
                <Select.Option className="form-control" value="1">
                  Semester 1
                </Select.Option>
                <Select.Option className="form-control" value="2">
                  Semester 2
                </Select.Option>
                <Select.Option className="form-control" value="3">
                  Semester 3
                </Select.Option>
                <Select.Option className="form-control" value="4">
                  Semester 4
                </Select.Option>
                <Select.Option className="form-control" value="5">
                  Semester 5
                </Select.Option>
                <Select.Option className="form-control" value="6">
                  Semester 6
                </Select.Option>
                <Select.Option className="form-control" value="7">
                  Semester 7
                </Select.Option>
                <Select.Option className="form-control" value="8">
                  Semester 8
                </Select.Option>
              </Select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label dep-form-hor">
              Lecture Hours :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <input
                type="text"
                className="form-control"
                value={lecHours}
                placeholder="Lecture Hours"
                onChange={(e) => setLecHours(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label dep-form-hor">
              Department :
            </label>
            <div className="col-sm-8 dep-form-hor">
              <Select
                value={department}
                onChange={(value) => setDepartment(value)}
                placeholder="Select department"
                style={{ width: "100%" }}
              >
                {departments.map((department) => (
                  <Select.Option
                    className="form-control"
                    key={department._id}
                    value={department.depName}
                  >
                    {department.depName}
                  </Select.Option>
                ))}
              </Select>
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
              type="reset"
              className="btn btn-primary dep-form-hor"
              style={{ backgroundColor: "gray" }}
              onClick={resetHandler}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="dep-topic">
        <span>List of Modules</span>
      </div>
      <div className="dep-topic">
        <input
          type="text"
          placeholder="Search by Module Code"
          value={searchModuleCode}
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
              Module Code
              </th>
              <th scope="col" style={{ width: "25px" }}>
                Module Name
              </th>
              <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                Semester
              </th>
              <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                Enrollment Key
              </th>
              <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                lecture Hours
              </th>
              <th scope="col" style={{ width: "20px", textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedModules.map((module, index) => (
               <tr key={index}>
                <th style={{ textAlign: "center" }}>{index + 1}</th>
                <td style={{ textAlign: "center" }}>{module.modCode}</td>
                <td>{module.modName}</td>
                <td style={{ textAlign: "center" }}>{module.semester}</td>
                <td style={{ textAlign: "center" }}>{module.enrolKey}</td>
                <td style={{ textAlign: "center" }}>{module.lecHours}</td>
                <td style={{ textAlign: "center" }}>
                <button
                    className="btn btn-danger dep-del"
                    onClick={() => deleteModule(module._id)}
                  >
                    <RiDeleteBin6Line
                      className="add-dep-del"
                      style={{ fontSize: "20px" }}
                    />
                  </button>
                  <button
                    className="btn btn-primary dep-edit"
                    onClick={() => editModule(module)}
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
  );
};

export default CreateModule;
