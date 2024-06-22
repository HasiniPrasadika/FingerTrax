import { React, useState, useEffect } from "react";
import { FaTh } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdApartment, MdPeopleAlt } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { logout } from "../../actions/userActions";
import "./Common_Styles/SideBar.css";

const Sidebar = (props) => {
  
  const navigate = useNavigate();
  let menuItem = props.menu;


  return (
    <div className="side-container">
      
      <div className="top_section">
        <img src="/Images/logo2.png" alt="Logo" />
      </div>
      {menuItem.map((item, index) => (
        <div
          key={index}
          className="link"
          onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}
        >
          <div className="icon">{item.icon}</div>
          <div className="link_text">{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
