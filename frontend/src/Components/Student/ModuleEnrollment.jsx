import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import "./Student.css";

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
    navigate(`/dashboard/enroll/semester/${department.depCode}`, { state: { department } });
  };

  return (
    <div className="en-container">
      <div className="enrollment-container-one">
        <div className="enrollment-second-container">
          <div>
            <span
              style={{ padding: "5px", fontSize: "18px", color: "#4154F1" }}
            >
              Enrollment
            </span>
          </div>
          <div>
            <span style={{ opacity: "0.8", padding: "5px", fontSize: "12px" }}>
              <GoTriangleRight /> Enrollment
            </span>
          </div>
          <div className="form-container">
            <div>
              <h5>Department</h5>
              {departments.map((department) => (
                <div className="department-button row" key={department._id}>
                  <div className="department-icon">
                    <FaCaretRight />
                  </div>
                  <div>
                    <a
                      key={department._id}
                      onClick={() => handleDepClick(department)}
                      className="status-box"
                    >
                      
                        {" "}
                        {department.depName}
                      
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleEnrollment;
