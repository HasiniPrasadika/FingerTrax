import React from 'react';
import { GoTriangleRight } from "react-icons/go";
import { IoChevronForwardOutline } from "react-icons/io5";
import '../Lecturer/Lecturer.css';
import StatusBox from './ModuleStatus';

const DashboardL = () => {

  return (
    <div className="dashboard">
    
        <div className="ruhuna-details" >
        <div>
            <span style={{opacity:'0.8', marginLeft:'10px', fontSize:'12px'}}><GoTriangleRight />Lecturer Dashboard </span>
        </div>
        <div className="row">
          <img src='/Images/logo_ruhuna.jpg'/>
        
        <div className='ruhuna-details-font'>
        <p>
          <span style={{fontSize:'50px'}}>Faculty of Engineering</span><br/>
          <span>University of Ruhuna</span>
        </p>
        </div>
        </div>
        </div>

        <div className="lecturer-first-row-container">
          <div className='sub-topics'>
            <h4 style={{fontWeight:'bold'}}>Enrolled Status</h4>
            <label style={{fontSize:"13px"}}><span ><IoChevronForwardOutline /><IoChevronForwardOutline /><IoChevronForwardOutline /></span>Department of Electrical Engineering</label>
          </div>
          <div className='module-container'>
          
          <StatusBox></StatusBox>
          <StatusBox></StatusBox>
          <StatusBox></StatusBox>
          <StatusBox></StatusBox>
          <StatusBox></StatusBox>
          <StatusBox></StatusBox>
          </div>
      </div>
    </div>
  );
};

export default DashboardL;
