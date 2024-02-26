import React from 'react';
import { useCookies } from "react-cookie";

import { useNavigate } from 'react-router-dom';

import { FaTh } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdPeopleAlt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import './Admin.css';

const AdminSidebar = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Destructure removeCookie correctly

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  const menuItem = [
    {
      path: "/admindashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/admin_lecture_details",
      name: "Lecture",
      icon: <MdPeopleAlt />
    },
    {
      path: "/admin_student_details",
      name: "Student",
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
            onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}
          >
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

export default AdminSidebar;
