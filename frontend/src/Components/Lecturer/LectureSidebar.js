import React from 'react';

import { FaTh } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdPeopleAlt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import '../Admin/Admin.css';
import { logout } from "../../actions/userActions";

const LectureSidebar = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   // Destructure removeCookie correctly

   const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Redirect to login page after logout
  };

  const menuItem = [
    {
      path: "/lecturedashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/lecture_create_module",
      name: "Create Module",
      icon: <MdPeopleAlt />
    },
    {
      path: "/lecture_Absence_applications",
      name: "Absence Applications",
      icon: <PiStudentBold />
    },
    {
      path: "/lecture_module_access",
      name: "Module Access",
      icon: <PiStudentBold />
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <FiLogOut />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="container">
      <div className="sidebar" style={{ width: '250px' }}>
        <div className="top_section">
          <div style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }} className="bars">
            <img src="/Images/logo2.png" style={{ width: '200px', height: '70px' }} alt="Logo" />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div
            key={index}
            className="link"
            style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px', marginRight: '10px' }}
            onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}>
            <div className="icon" style={{ fontSize: '25px' }}>
              {item.icon}
            </div>
            <div style={{ display: 'block' }} className="link_text">
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default LectureSidebar;
