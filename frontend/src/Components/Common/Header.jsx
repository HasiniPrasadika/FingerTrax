import { React, useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import "./Common_Styles/Header.css";

const Header = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { userInfo } = userLogin;
  const [isOpen, setIsOpen] = useState(false);
  let menuItem = props.menu;

  return (
    <div className="header">
      <div className="menu-icon">
        <button className="button-icon" onClick={() => setIsOpen(!isOpen)}><RiMenuLine className="icon" /></button>
        
        {isOpen && (
          <div className="dropdown">
            {menuItem.map((item, index) => (
              <div
                key={index}
                className="dropdown-text"
                onClick={() => {
                  setIsOpen(false);
                  item.onClick ? item.onClick() : navigate(item.path);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}      
        
        
      </div>
      <div className="user-detail">
        <div className="user-name">
          Hello, {userInfo ? userInfo.userName : "User Name"}{" "}
        </div>
        <div style={{ width: 10 }}></div>

        <img src={userInfo.image.url ? userInfo.image.url : "/Images/1.jpeg"} className="user-image" alt="Admin" />
      </div>
    </div>
  );
};

export default Header;
