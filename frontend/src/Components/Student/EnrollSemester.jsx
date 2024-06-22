import React from "react";
import { FaCaretRight } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Student.css";
import "./Student Styles/ModuleEnrollment.css";
import axios from "axios";

const EnrollSemester = () => {
  const { state } = useLocation();
  const department = state.department;
  const navigate = useNavigate();

  const noSemester = 8;

  const semesterLinks = Array.from({ length: noSemester }, (_, index) => ({
    depName: department.depName,
    semester: (index + 1).toString(),
  }));
  const handleSemClick = async (semesterObject) => {
    try {
      // Make API call to fetch modules
      const response = await axios.get(
        "http://localhost:8070/api/modules/getallmod"
      );
      const depName = semesterObject.depName;
      const semester = semesterObject.semester.toString();
      console.log(depName);
      console.log(response);
      // Filter the modules based on department and semester
      const filteredModules = response.data.filter(
        (module) =>
          module.department === depName && module.semester === semester
      );
      console.log(filteredModules);
      // Navigate to the new route and pass the modules in the state
      navigate(
        `/dashboard/enroll/semester/semester_modules/${semesterObject.semester}`,
        {
          state: { modules: filteredModules },
        }
      );
    } catch (error) {
      console.error("Error fetching modules", error);
    }
  };

  return (
    <div className="en-container">
      <div className="enrollment-container-one">
        <div className="en-navigate">
          <span>
            <GoTriangleRight />
          </span>
          Module Enrollment / Department / Semester
        </div>
        <div className="en-topic">
          <span>Semester</span>
        </div>

        <div className="en-details">
          {semesterLinks.map((semesterObject, index) => (
            <a
              key={semesterObject._id}
              onClick={() => handleSemClick(semesterObject)}
              style={{ color: "white" }}
            >
              <div className="department-button">
                <div className="department-icon">
                  <FaCaretRight />
                </div>
                <div className="department-icon">Semester {semesterObject.semester} </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnrollSemester;
