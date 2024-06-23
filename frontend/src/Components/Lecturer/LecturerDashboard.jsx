import React, { useEffect, useState } from "react";
import { FaRegChartBar } from "react-icons/fa6";
import { GoTriangleRight } from "react-icons/go";
import { IoChevronForwardOutline } from "react-icons/io5";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Lecturer Styles/LecturerDashboard.css";
import "../Admin/Admin Styles/AdminDashboard.css";

import axios from "axios";

const LecturerDashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [modules, setModules] = useState([]);

  const [currentModule, setCurrentModule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/modules/getallmod")
      .then((response) => {
        const filteredModules = response.data.filter((module) =>
          module.modCoordinator.userName === userInfo.userName ||
          module.lecturers.some((lecturer) => lecturer.userName === userInfo.userName)
        );
        setModules(filteredModules);
      })
      .catch((error) => {
        console.error("Error fetching modules", error);
      });
  }, [modules]);


  const handleModuleClick = (module) => {
    navigate(`/dashboard/module/${module.modCode}`, { state: { module } });
  };

  return (
    <div className="lecturer-dashboard-container">
      <div className="ruhuna-details">
        <span>
          <GoTriangleRight />
          Lecturer Dashboard{" "}
        </span>

        <div className="row">
          <img className="imagelogo" src="/Images/logo_ruhuna.jpg" />
          <div className="ruhuna-details-font">
            <span className="faculty">Faculty of Engineering</span>

            <span className="campus">University of Ruhuna</span>
          </div>
        </div>
      </div>
      <div className="lecturer-content-container">
        <div className="lecturer-module-content">
          <h4 className="enrolled-status">Enrolled Status</h4>
          
        </div>
        <div className="lec-module-container">
          {modules.map((module, index) => (
            <a
              key={module._id}
              onClick={() => handleModuleClick(module)}
              className="status-box-dash"
            >
              <div className="module-icon-dash">
                <FaRegChartBar />
              </div>
              <div className="module-name-dash">
                <p>
                  {module.modCode} <br />
                  {module.modName}
                </p>
              </div>
              <div className="student-count">
                <p>
                  {module.noOfStu}
                  <br />
                  Students
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
