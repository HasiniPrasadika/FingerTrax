import React from "react";
import { RiMenuLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LectureHeader = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="header">
      <div className="header-content">
        <RiMenuLine className="icon" />
        <span className="admin-name">
          {userInfo ? userInfo.fullName : "Admin Name"}
        </span>
        <img src={"/Images/1.jpeg"} alt="Admin" className="admin-image" />
      </div>
    </div>
  );
};

export default LectureHeader;
