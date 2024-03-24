import React from "react";
import { RiMenuLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const StudentHeader = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="header">
      <div className="header-content">
        <RiMenuLine className="icon" />
        <span className="admin-name">
          {userInfo ? userInfo.fullName : "Admin Name"}
        </span>
        <img
          src={userInfo ? userInfo.image : "/Images/profile.webp"}
          alt="Admin"
          className="admin-image"
        />
      </div>
    </div>
  );
};

export default StudentHeader;
