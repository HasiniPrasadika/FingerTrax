import { React, useState, useEffect } from "react";
import { GoTriangleRight } from "react-icons/go";
import axios from "axios";

import "./Lecturer Styles/ModuleAccess.css";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import { useSelector } from "react-redux";
import { BsDot } from "react-icons/bs";
import { FaRegChartBar } from "react-icons/fa6";
const ModuleAccess = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [modules, setModules] = useState([]);
  const [modName, setModName] = useState("");
  const [modCode, setModCode] = useState("");
  const [regNo, setRegNo] = useState("");

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
  }, [modules]);
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/api/modules/giveaccess", {
        modCode,
        modName,
        regNo,
        modCoordinate: userInfo.userName,
      })
      .then((response) => {
        setSMessage("Access granted successfully!");
        setTimeout(() => {
          setSMessage(null);
        }, 3000);
        resetHandler();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            if (error.response.data.message === "Module not found") {
              setMessage("Module not found");
            } else if (error.response.data.message === "User not found") {
              setMessage("Lecturer not found");
            }
          } else if (error.response.status === 400) {
            setMessage("Lecturer already has access");
          } else if (error.response.status === 403) {
            setMessage(
              "You don't have the access to give access for this module"
            );
          } else {
            setMessage("Failed to give access!");
          }
        } else {
          setMessage("Network Error");
        }
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
  };

  const resetHandler = () => {
    setRegNo("");
    setModCode("");
    setModName("");
  };
  const handleModuleClick = (module) => {
    setModName(module.modName);
    setModCode(module.modCode);
  };
  return (
    <div className="access">
      <div className="module-access-container">
        <div className="dep-navigate">
          <span>
            <GoTriangleRight />
          </span>
          Module Access
        </div>
        <div className="dep-topic">
          <span>Give Access</span>
        </div>
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {smessage && (
          <SuccessMessage variant="success">{smessage}</SuccessMessage>
        )}

        <div className="access-module-form">
          <form className="form-style" onSubmit={submitHandler}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="modName">Module Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="modName"
                  name="modName"
                  value={modName}
                  placeholder="Module Name"
                  onChange={(e) => setModName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="modCode ">Module Code </label>
                <input
                  type="text"
                  className="form-control"
                  id="modCode"
                  name="modCode"
                  value={modCode}
                  placeholder="Module Code"
                  onChange={(e) => setModCode(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="regNo">Access To</label>
                <input
                  type="text"
                  className="form-control"
                  id="regNo"
                  name="regNo"
                  value={regNo}
                  placeholder="Lecturer Reg No"
                  onChange={(e) => setRegNo(e.target.value)}
                />
              </div>

            </div>

            <div className="form-row">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginRight: "25px", marginLeft: "5px" }}
                onClick={submitHandler}
              >
                Give Aceess
              </button>
              <button
                type="reset"
                className="btn btn-primary"
                onClick={resetHandler}
                style={{ backgroundColor: "gray" }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="access-module-container">
          {modules.map((module) => (
            <div
              className="module-access-box"
              key={module._id}
              onClick={() => handleModuleClick(module)}
            >
              <div className="column">
                <div className="accessmodname">
                  <div className="module-icon-access">
                    <FaRegChartBar />
                  </div>
                  <div className="module-name">
                    <p>
                      {module.modCode} {module.modName}
                    </p>
                  </div>
                </div>
                <div className="access-lecturer-names">
                  <h6>Module Coordinator: {module.modCoordinator.fullName}</h6>
                  {module.lecturers.map((lecturer, index) => (
                    <h6>
                      <BsDot /> {lecturer.fullName}{" "}
                    </h6>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );

};

export default ModuleAccess;
