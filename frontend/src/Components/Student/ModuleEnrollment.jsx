import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

import "./Student Styles/ModuleEnrollment.css";

const ModuleEnrollment = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/departments/getalldep")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments", error);
      });
  }, []);
  const handleDepClick = (department) => {
    navigate(`/dashboard/enroll/semester/${department.depCode}`, {
      state: { department },
    });
  };

  return (
    <div className="en-container">
      <div className="enrollment-container-one">
        <div className="en-navigate">
          <span>
            <GoTriangleRight />
          </span>
          Module Enrollment / Department
        </div>
        <div className="en-topic">
          <span>Department</span>
        </div>

        <div className="en-details">
          {departments.map((department) => (
            <a key={department._id} onClick={() => handleDepClick(department)}>
              <div className="department-button" key={department._id}>
                <div className="department-icon">
                  <FaCaretRight />
                </div>
                <div className="department-icon"> {department.depName}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleEnrollment;
