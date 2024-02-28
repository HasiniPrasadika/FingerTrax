import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { GoTriangleRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Admin.css';
import DashboardCount from './DashboardCount';


const Dashboard = () => {

  
  
  
  

  return (
    <div className="dashboard-container">
    
        <div className="ruhuna-details" >
        <div>
            <span style={{opacity:'0.8', marginLeft:'10px', fontSize:'12px'}}><GoTriangleRight />Admin Dashboard </span>
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
          <DashboardCount></DashboardCount>
        </div>
        <div className="item">
        <DashboardCount></DashboardCount>
        </div>
        <div className="item">
        <DashboardCount></DashboardCount>
        </div>
        <div className="item">
        <DashboardCount></DashboardCount>
        </div>
        <div className="item">
        <DashboardCount></DashboardCount>
        </div>
        <div className="item">
        <DashboardCount></DashboardCount>
        </div>

    </div>
    

    
</div>
  );
};

export default Dashboard;
