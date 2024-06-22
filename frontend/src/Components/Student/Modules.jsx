import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Student Styles/ModuleEnrollment.css";

const Modules = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const modules = state.modules;
  const handleModuleClick = (module) => {
    navigate(
      `/dashboard/enroll/semester/semester_modules/module/${module.modCode}`,
      { state: { module } }
    );
  };

  return (
    <div className="en-container">
      <div className="enrollment-container-one">
        <div className="en-navigate">
          <span>
            <GoTriangleRight />
          </span>
          Module Enrollment / Department / Semester / Module
        </div>
        <div className="en-topic">
          <span>Module</span>
        </div>

        <div className="en-details">
          {modules.map((module, index) => (
            <a
              key={index}
              onClick={() => handleModuleClick(module)}
              style={{ color: "white" }}
            >
              <div className="department-button">
                <div className="department-icon">
                  <FaCaretRight />
                </div>
                <div className="department-icon">
                  {module.modCode} {module.modName}{" "}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modules;
