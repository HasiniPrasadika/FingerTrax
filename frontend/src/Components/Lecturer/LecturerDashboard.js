import React, { useEffect } from "react";
import { GoTriangleRight } from "react-icons/go";
import { IoChevronForwardOutline } from "react-icons/io5";
import "../Lecturer/Lecturer.css";
import { FaRegChartBar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";
import { listModules } from "../../actions/modActions";

const DashboardL = () => {
  const dispatch = useDispatch();
  const modulesList = useSelector((state) => state.modList);
  const { loading, error, modules } = modulesList;

  useEffect(() => {
    dispatch(listModules());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="ruhuna-details">
        <div>
          <span
            style={{ opacity: "0.8", marginLeft: "10px", fontSize: "12px" }}
          >
            <GoTriangleRight />
            Lecturer Dashboard{" "}
          </span>
        </div>
        <div className="row">
          <img src="/Images/logo_ruhuna.jpg" />

          <div className="ruhuna-details-font">
            <p>
              <span style={{ fontSize: "50px" }}>Faculty of Engineering</span>
              <br />
              <span>University of Ruhuna</span>
            </p>
          </div>
        </div>
      </div>

      <div className="lecturer-first-row-container">
        <div className="sub-topics">
          <h4 style={{ fontWeight: "bold" }}>Enrolled Status</h4>
          <label style={{ fontSize: "13px" }}>
            <span>
              <IoChevronForwardOutline />
              <IoChevronForwardOutline />
              <IoChevronForwardOutline />
            </span>
            Department of Electrical Engineering
          </label>
        </div>
        <div className="module-container">
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            modules.map((module, index) => (
              <Link to="/lecturer_module_view">
                <div className="status-box" key={index}>
                  <div
                    className="row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px",
                    }}
                  >
                    <div className="module-icon">
                      <FaRegChartBar />
                    </div>
                    <div className="module-name">
                      <p>
                        {module.modCode} <br />
                        {module.modName}
                      </p>
                    </div>
                    <div className="student-count">
                      <p style={{ fontWeight: "bold" }}>
                        {module.noOfStu}
                        <br />
                        Students
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default DashboardL;
