import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { IoChevronForwardOutline } from "react-icons/io5";
import "./Admin Styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [departments, setDepartments] = useState([]);

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

  return (
    <div className="admin-dashboard-container">
      <div className="ruhuna-details">
        <span>
          <GoTriangleRight style={{backgroundColor: "white"}} />
          Admin Dashboard{" "}
        </span>

        <div className="row">
          <img className="imagelogo" src="/Images/logo_ruhuna.jpg" />
          <div className="ruhuna-details-font">
            
              <span className="faculty">Faculty of Engineering</span>
              
              <span className="campus">University of Ruhuna</span>
            
          </div>
        </div>
      </div>
      <div className="second-row-container">
      {departments.map((department) => (
            <div className="item" key={department._id}>
              
                <div className="dep-name"><span><IoChevronForwardOutline style={{backgroundColor: "white"}} /><IoChevronForwardOutline style={{backgroundColor: "white"}} /></span>
                {department.depName}
                </div>  
                <div className='count'>
                  <div className='lecture'>
                    <div className="mem-icon"><FaChalkboardTeacher style={{backgroundColor: "#e8f4ff"}}/></div>
                    <div className="mem-topic"><span style={{backgroundColor: "#e8f4ff"}}>Lectures</span></div>
                    <div className="mem-topic"><span style={{backgroundColor: "#e8f4ff"}}>{department.noOfLec}</span></div>
                  </div>
                  <div className='student'>
                    <div className="mem-icon"><FaUserGraduate style={{backgroundColor: "#e8f4ff"}}/></div>
                    <div className="mem-topic"><span style={{backgroundColor: "#e8f4ff"}}>Students</span></div>
                    <div className="mem-topic"><span style={{backgroundColor: "#e8f4ff"}}>{department.noOfStu}</span></div>
                  </div>
                </div>
              
            </div>
          ))
        }
      </div>
      
    </div>
  );
};

export default AdminDashboard;
