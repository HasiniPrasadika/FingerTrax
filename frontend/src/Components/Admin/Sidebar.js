import $ from 'jquery'; // Import jQuery
import React, { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { FaTh } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { MdPeopleAlt } from 'react-icons/md';
import { PiStudentBold } from 'react-icons/pi';
import React from 'react';



import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const sidebarRef = useRef(null); // Ref for the sidebar container

  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // Destructure removeCookie correctly


  const handleLogout = () => {
    removeCookie('token');
    navigate('/login');
  };

  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/lecture",
      name: "Lecture",
      icon: <MdPeopleAlt />
    },
    {
      path: "/student",
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


  useEffect(() => {
    $(document).ready(function(){
      $('.mobnav h3').click(function(){
        $('.mobnav ul').toggle();

      });
    });});

  return (
    <div className="sidebar-container">
      <div className="sidebar">

        <div className="top_section">
          <div style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }} className="bars">
            <img src="/Images/logo2.png" style={{ width: '100%', height: '100%' }} alt="Logo" />
          </div>
        </div>
        <div>
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
      </div>
      <main>{children}</main>

      <div className="mobnav">
        <h3>Menu</h3>
        <ul>
          {menuItem.map((item, index) => (
            <li
              key={index}
              className="link"
              style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px', marginRight: '10px', listStyleType: 'none' }}
              onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}
            >
              <div className="icon" style={{ fontSize: '25px', display: 'inline-block' }}>
                {item.icon}
              </div>
              <div style={{ display: 'inline-block', marginLeft: '10px' }} className="link_text">
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
