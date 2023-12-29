import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Admin.css';
import DashboardCount from './DashboardCount';

const Dashboard = () => {
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
      <div className="row">
          <div className="ruhuna-details" >
          <div>
              <h6 style={{opacity:'0.8', padding:'5px'}}>Dashboard</h6> 
          </div>
          <div><img src='/Images/ruhuna.jpeg' /> </div>
          <div className='ruhuna-details-font'>
              <p>Faculty of Engineering </p>
              <p>University of Ruhuna</p>
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

      </div>
      

      
  </div>
    );
};

export default Dashboard;
