import React from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { Link } from "react-router-dom";

const ModuleBox = () => {
  return (
    <div className="module-box">
      <div className="module-name">
        <div style={{ fontWeight: "bold" }}>
          <span>EE5301</span>
        </div>
        <div style={{ fontWeight: "normal" }}>
          <span>Discrete Mathematics</span>
        </div>
      </div>
      <div className="module-info">
        <Link
          to="/student-attendance-record"
          style={{
            color: "white",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "5px" }}>More Info</span>
          <span style={{ fontSize: "20px", marginTop: "5px" }}>
            <MdOutlineArrowCircleRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ModuleBox;
