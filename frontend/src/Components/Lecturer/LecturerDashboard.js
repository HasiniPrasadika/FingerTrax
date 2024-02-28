import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { GoTriangleRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../Admin/Admin.css';
import DashboardLCount from '../Admin/DashboardCount';


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

    <div className="second-row-container">
        <div className="item">
          <DashboardLCount></DashboardLCount>
        </div>
        <div className="item">
        <DashboardLCount></DashboardLCount>
        </div>
        <div className="item">
        <DashboardLCount></DashboardLCount>
        </div>
        <div className="item">
        <DashboardLCount></DashboardLCount>
        </div>

    </div>
    

    
</div>
  );
};

export default DashboardL;
