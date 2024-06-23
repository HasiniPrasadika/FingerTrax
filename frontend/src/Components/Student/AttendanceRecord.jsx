import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Student Styles/AttendanceRecord.css";

const AttendanceRecord = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { state } = useLocation();
  const module = state.module;
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const [attendedLectureHours, setAttendedLectureHours] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8070/api/attendance/getmyattendance",
          {
            moduleCode: module.modCode,
          }
        );
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
        const student = record.enrolledStudents.find(
          (student) => student.regNo === userInfo.regNo
        );
        return (
          total + (student && student.attendanceData ? record.lectureHours : 0)
        );
      }, 0);
      setAttendedLectureHours(totalAttendedHours);

      const percentage =
        (totalAttendedHours / module.conductedLectureHours) * 100;
      setProgressValue(Math.round(percentage));
    }
  }, [attendanceRecords, module.conductedLectureHours, userInfo.regNo]);

  return (
    <div className="att-container">
      <div className="att-vie-container">
        <div className="att-second-container">
          <div className="dep-navigate">
            <span>
              <GoTriangleRight />
            </span>
            Department / {module.modCode} {module.modName}
          </div>
          <div className="dep-topic">
            <span>
              {module.modCode} {module.modName}
            </span>
          </div>

          <div className="att-details">
            <div className="attendance-square">
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
        <div className="dep-topic">
          <span>Attendance Records</span>
        </div>

        <div className="dep-table-wrapper">
          <table className="dep-add-table">
            <thead style={{ backgroundColor: "#dfeaf5", borderRadius: 15 }}>
              <tr>
                <th style={{ width: "5px", textAlign: "center" }} scope="col">#</th>
                <th style={{ width: "5px", textAlign: "center" }} scope="col">Date</th>
                <th style={{ width: "5px", textAlign: "center" }} scope="col">Time</th>
                <th style={{ width: "5px", textAlign: "center" }} scope="col">Lecture Hours</th>
                <th style={{ width: "5px", textAlign: "center" }} scope="col">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => {
                const student = record.enrolledStudents.find(
                  (student) => student.regNo === userInfo.regNo
                );
                return (
                  <tr key={index}>
                    <th style={{ textAlign: "center" }} scope="row">{index + 1}</th>
                    <td style={{ textAlign: "center" }}>{new Date(record.date).toLocaleDateString()}</td>
                    <td style={{ textAlign: "center" }}>
                      {new Date(record.startTime).toLocaleTimeString()} -{" "}
                      {new Date(record.endTime).toLocaleTimeString()}
                    </td>
                    <td style={{ textAlign: "center" }}>{record.lectureHours}</td>
                    <td style={{ textAlign: "center" }}>{student && student.attendanceData ? "Yes" : "No"}</td>
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
