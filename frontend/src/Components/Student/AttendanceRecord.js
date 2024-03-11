import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { Link } from "react-router-dom";
import "../Admin/Admin.css";

const AttendanceRecord = () => {
  const [form] = Form.useForm();

  const [progressValue, setProgressValue] = useState(0);
  const progressEndValue = 80;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (progressValue < progressEndValue) {
        setProgressValue(progressValue + 1);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [progressValue, progressEndValue]);

  return (
    <div className="att-container">
      <div className="att-second-container">
        <div>
          <span style={{ padding: "5px", fontSize: "18px", color: "#4154F1" }}>
            Dashboard
          </span>
        </div>
        <div>
          <Link
            to="/studentdashboard"
            style={{
              opacity: "0.8",
              padding: "5px",
              paddingRight: "0px",
              fontSize: "12px",
              color: "black",
            }}
          >
            <GoTriangleRight /> Dashboard/
          </Link>
          <span
            style={{ padding: "2px", fontSize: "12px", fontWeight: "bold" }}
          >
            EE5301 Discreate Mathematics{" "}
          </span>
        </div>
        <div className="att-details">
          <div className="attendance-square">
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>
              Discreate Mathematics
            </div>
            <div
              className="attendance-circle"
              style={{
                background: `conic-gradient(#4d5bf9 ${
                  progressValue * 3.6
                }deg, #cadcff ${progressValue * 3.6}deg)`,
              }}
            >
              <div className="value-container">{progressValue}%</div>
            </div>
            <div>Lecture Hours: 20</div>
            <div>Total Lecture Hours: 25</div>
          </div>
        </div>
      </div>

      <div className="attendance-list">
        <h3
          style={{ marginBottom: "20px", color: "#012970", marginLeft: "5px" }}
        >
          Attendance Record
        </h3>
        <div className="table-design">
          <table class="table">
            <thead style={{ backgroundColor: "#dfeaf5" }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Lecture Hours</th>
                <th scope="col">Attendance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>2024/01/03</td>
                <td>8.30am - 10.30am</td>
                <td>2</td>
                <td>Yes</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>2024/01/07</td>
                <td>8.30am - 10.30am</td>
                <td>2</td>
                <td>Yes</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>2024/01/08</td>
                <td>8.30am - 09.30am</td>
                <td>1</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecord;
