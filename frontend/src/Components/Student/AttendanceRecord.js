import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Admin/Admin.css";
import axios from "axios";

const AttendanceRecord = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 
  const {state} =useLocation();
  const module = state.module;
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  
  const [attendedLectureHours, setAttendedLectureHours] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.post("http://localhost:8070/api/attendance/getmyattendance",{
          moduleCode: module.modCode
        });
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error("Error fetching attendance records", error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  useEffect(() => {
    if (attendanceRecords.length > 0) {
      const totalAttendedHours = attendanceRecords.reduce((total, record) => {
        const student = record.enrolledStudents.find(student => student.regNo === userInfo.regNo);
        return total + (student && student.attendanceData ? record.lectureHours : 0);
      }, 0);
      setAttendedLectureHours(totalAttendedHours);

      const percentage = (totalAttendedHours / module.conductedLectureHours) * 100;
      setProgressValue(Math.round(percentage));
    }
  }, [attendanceRecords, module.conductedLectureHours, userInfo.regNo]);

  return (
    <div className="att-container">
      <div className="att-second-container">
        <div>
          <span style={{ padding: "5px", fontSize: "18px", color: "#4154F1" }}>
            Dashboard
          </span>
        </div>
        <div>
          <Link to="/studentdashboard" style={{opacity: "0.8", padding: "5px",paddingRight: "0px",
              fontSize: "12px",
              color: "black",
            }}>
            <GoTriangleRight /> Dashboard/
          </Link>
          <span
            style={{ padding: "2px", fontSize: "12px", fontWeight: "bold" }}
          >
            {module.modCode} {module.modName}
          </span>
        </div>
        <div className="att-details">
          <div className="attendance-square">
            <div style={{ fontWeight: "bold", fontSize: "14px" }}>
              {module.modName}
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
            <div>Conducted Lecture Hours: {module.conductedLectureHours}</div>
            <div>Total Lecture Hours: {module.lecHours}</div>
            <div>Attended Lecture Hours: {attendedLectureHours}</div>
          </div>
        </div>
      </div>

      <div className="attendance-list">
        <h3>
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
            {attendanceRecords.map((record, index) => {
                const student = record.enrolledStudents.find(student => student.regNo === userInfo.regNo);
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{new Date(record.startTime).toLocaleTimeString()} - {new Date(record.endTime).toLocaleTimeString()}</td>
                    <td>{record.lectureHours}</td>
                    <td>{student && student.attendanceData ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecord;
