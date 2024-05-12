import React, { useEffect, useState } from "react";
import { FaRegChartBar } from "react-icons/fa6";
import { GoTriangleRight } from "react-icons/go";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Lecturer/Lecturer.css";

import axios from "axios";

const DashboardL = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/modules/getallmod")
      .then((response) => {
        const filteredModules = response.data.filter(
          (module) => module.modCoordinator === userInfo.userName
        );
        setModules(filteredModules);
      })
      .catch((error) => {
        console.error("Error fetching modules", error);
      });
  }, [modules]);

  return (
    <div className="dashboard">
      <div className="ruhuna-details">
        <div>
          <span
            style={{ opacity: "0.8", marginLeft: "10px", fontSize: "12px" }}
          >
            <GoTriangleRight />
            Lecturer Dashboard{" "}
          </span>
        </div>
        <div className="row">
          <img className="imagelogo" src="/Images/logo_ruhuna.jpg" />

          <div className="ruhuna-details-font">
            <p>
              <span style={{ fontSize: "50px" }}>Faculty of Engineering</span>
              <br />
              <span>University of Ruhuna</span>
            </p>
          </div>
        </div>
      </div>

      <div className="lecturer-first-row-container">
        <div className="sub-topics">
          <h4 style={{ fontWeight: "bold" }}>Enrolled Status</h4>
          <label style={{ fontSize: "13px" }}>
            <span>
              <IoChevronForwardOutline />
              <IoChevronForwardOutline />
              <IoChevronForwardOutline />
            </span>
            Department of Electrical Engineering
          </label>
        </div>
        <div className="module-container">
          {modules.map((module, index) => (
            
            <Link to='/lecturer_module_view' state={{module: module}}>
              <div className="status-box" key={index}>
                <div
                  className="row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "25px",
                  }}
                >
                  <div className="module-icon">
                    <FaRegChartBar />
                  </div>
                  <div className="module-name">
                    <p>
                      {module.modCode} <br />
                      {module.modName}
                    </p>
                  </div>
                  <div className="student-count">
                    <p style={{ fontWeight: "bold" }}>
                      {module.noOfStu}
                      <br />
                      Students
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardL;
