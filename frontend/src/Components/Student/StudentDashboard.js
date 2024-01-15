import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { GoTriangleRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../Admin/Admin.css';
import DashboardSCount from '../Admin/DashboardCount';


const DashboardS = () => {
const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:8070",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <div className="dashboard">
    
        <div className="ruhuna-details" >
        <div>
            <span style={{opacity:'0.8', marginLeft:'10px', fontSize:'12px'}}><GoTriangleRight />Student Dashboard </span>
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
          <DashboardSCount></DashboardSCount>
        </div>
        <div className="item">
        <DashboardSCount></DashboardSCount>
        </div>
        <div className="item">
        <DashboardSCount></DashboardSCount>
        </div>
        <div className="item">
        <DashboardSCount></DashboardSCount>
        </div>

    </div>
    

    
</div>
  );
};

export default DashboardS;
