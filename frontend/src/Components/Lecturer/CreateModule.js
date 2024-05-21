import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoTriangleRight } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";

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
        const filteredModules = response.data.filter(module => module.modCoordinator === userInfo.userName);
      setModules(filteredModules);
      })
      .catch((error) => {
        console.error("Error fetching modules", error);
      });
  }, [modules]);


  const submitHandler = (e) => {
    // try{
    //   e.preventDefault();
    //   dispatch(createModuleAction(modCode, modName, enrolKey, semester, lecHours));
    //   setMessage("Module Added successfully!");
    //   setTimeout(() => {
    //     setMessage(null);
    //   }, 3000);

    // } catch (error) {
    //   setMessage("Failed to add Module!");
    // }
    try {
      e.preventDefault();
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
    } catch (error) {
      setMessage("Failed to add Module!");
    }
  };
  const resetHandler = () => {
    setmodCode("");
    setmodName("");
    setenrolKey("");
    setLecHours("");
    setSemester("");
    setDepartment("");
  };

  return (
    <div className="lecturer-first-row-container">
      <div className="path-style">
        <br />
        <p style={{ opacity: 0.8 }}>
          <GoTriangleRight />
          Create Module
        </p>
      </div>
      <div>
        <h3 className="topic-style">Add Module</h3>
      </div>
      <div className="module-form">
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {smessage && <SuccessMessage variant="success">{smessage}</SuccessMessage>}
        <form onSubmit={submitHandler} className="form-style">
          <div className="form-group row">
            <label htmlFor="modulecode" className="col-sm-4 col-form-label">
              Module Code{" "}
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="modCode"
                name="modCode"
                value={modCode}
                onChange={(e) => setmodCode(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="modulename" className="col-sm-4 col-form-label">
              Module Name
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="modName"
                name="modName"
                value={modName}
                onChange={(e) => setmodName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="enroll" className="col-sm-4 col-form-label">
              Enrollment Key
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="enrolKey"
                name="enrolKey"
                value={enrolKey}
                onChange={(e) => setenrolKey(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="semester" className="col-sm-4 col-form-label">
              Semester
            </label>
            <Select 
              value={semester}
              onChange={(value) => setSemester(value)}
              placeholder="Select semester"
              style={{ height:'35px' , width:'485px', marginLeft:'15px'}}
            >
              <Select.Option value="1">Semester 1</Select.Option>
              <Select.Option value="2">Semester 2</Select.Option>
              <Select.Option value="3">Semester 3</Select.Option>
              <Select.Option value="4">Semester 4</Select.Option>
              <Select.Option value="5">Semester 5</Select.Option>
              <Select.Option value="6">Semester 6</Select.Option>
              <Select.Option value="7">Semester 7</Select.Option>
              <Select.Option value="8">Semester 8</Select.Option>
            </Select>
            {/* <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="semester"
                name="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </div> */}
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              Lecturer Hours
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                value={lecHours}
                onChange={(e) => setLecHours(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              Department
            </label>
            <Select
              value={department}
              onChange={(value) => setDepartment(value)}
              placeholder="Select department"
              style={{ height:'35px' , width:'485px', marginLeft:'15px'}}
            >
              {departments.map((department) => (
                <Select.Option key={department._id} value={department.depCode}>
                  {department.depName}
                </Select.Option>
              ))}
            </Select>
            {/* <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="lecHours"
                name="lecHours"
                value={lecHours}
                onChange={(e) => setLecHours(e.target.value)}
              />
            </div> */}
          </div>
          <div className="form-row">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "25px", marginLeft: "5px" }}
              onClick={submitHandler}
            >
              Submit
            </button>
            <button
          className="btn btn-primary"
          style={{ backgroundColor: "gray" }}
          onClick={resetHandler}
        >
          Reset
        </button>
          </div>
        </form>
        
      </div>
      <br />
      <div>
        <h3 className="topic-style">Current Modules</h3>
      </div>
      <div className="table-design">
        <table class="table">
          <thead style={{ backgroundColor: "#dfeaf5" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Module Code</th>
              <th scope="col">Module Name</th>
              <th scope="col">Semester</th>
              <th scope="col">Enrollment Key</th>
              <th scope="col">Lecturer Hours</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
                <tr key={module._id}>
                <th scope="row"></th>
                <td>{module.modCode}</td>
                <td>{module.modName}</td>
                <td>{module.semester}</td>
                <td>{module.enrolKey}</td>
                <td>{module.lecHours}</td>
                <td>
                  
                  <span className="delete-icon">
                    <RiDeleteBin6Line />
                  </span>
                </td>
              </tr>

            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateModule;
