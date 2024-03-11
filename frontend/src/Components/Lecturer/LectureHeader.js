import React from "react";
import { RiMenuLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const LectureHeader = () => {
  return (
    <div className="header">
      <div className="header-content">
        <Link to="/lecture_profile_update">
          <span className="admin-name">Admin Name</span>
        </Link>

        <RiMenuLine className="icon" />
        <img src="/Images/1.jpeg" alt="Admin" className="admin-image" />
      </div>
    </div>
  );
};

export default LectureHeader;
