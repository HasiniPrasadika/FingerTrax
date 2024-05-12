import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { IoChevronForwardOutline } from "react-icons/io5";
import './Admin.css';

const Dashboard = () => {
   
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
    .get('http://localhost:8070/api/departments/getalldep')
    .then((response) => {
      setDepartments(response.data);
    })
    .catch((error) => {
      console.error('Error fetching departments', error);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="ruhuna-details" style={{marginLeft:"0px"}}>
        <div>
          <span style={{opacity:'0.8', marginLeft:'10px', fontSize:'12px'}}><GoTriangleRight />Admin Dashboard </span>
        </div>
        <div className="row">
          <img className="imagelogo" src='/Images/logo_ruhuna.jpg'/>
          <div className='ruhuna-details-font'>
            <p>
              <span style={{fontSize:'50px'}}>Faculty of Engineering</span><br/>
              <span>University of Ruhuna</span>
            </p>
          </div>
        </div>
      </div>

      <div className="second-row-container">
        {departments.map((department) => (
            <div className="item" key={department._id}>
              <div className='count-container' >
                <div style={{fontWeight:'lighter', margin:'10px'}}><span style={{fontSize:'12px'}}><IoChevronForwardOutline /><IoChevronForwardOutline /></span>
                {department.depName}
                </div>  
                <div className='count'>
                  <div className='lecture'>
                    <div><FaChalkboardTeacher size={55} opacity={0.9} /></div>
                    <div><span>Lectures</span></div>
                    <div><span>{department.noOfLec}</span></div>
                  </div>
                  <div className='student'>
                    <div><FaUserGraduate size={50} opacity={0.9} /></div>
                    <div><span>Students</span></div>
                    <div><span>{department.noOfStu}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
