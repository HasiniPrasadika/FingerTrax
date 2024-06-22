import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { onValue, ref, set } from "firebase/database";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";
import {
    BiDotsVerticalRounded,
    BiTachometer,
    BiUserCheck,
    BiUserX,
} from "react-icons/bi";
import { GoTriangleRight } from "react-icons/go";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import SuccessMessage from "../../Components/SuccessMessage";
import { fireDb } from "../../firebase";
import ErrorMessage from "../ErrorMessage";

const today = dayjs();

const isInCurrentMonth = (date) => date.get("month") === dayjs().get("month");

const ModuleDetails = () => {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isDailyDisplay, setIsDailyDisplay] = useState(false);
  const { state } = useLocation();
  const module = state.module;
  const moduleCod = module.modCode;
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDailyCalendar, setShowDailyCalendar] = useState(false);
  const [moduleCode, setModuleCode] = useState(module.modCode);
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [attendanceData, setAttendanceData] = useState();
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [lectureHours, setLectureHours] = useState();
  const [res, setRes] = useState();
  const [daily, setDaily] = useState(null);
  const [dailyAttendance, setDailyAttendance] = useState();

  const handleCalendarChange = (date) => {
    setDate(date);
    setDaily(date);
    setShowCalendar(false);
  };
  const handleDailyCalendarChange = (date) => {
    setDaily(date);
    setShowDailyCalendar(false);
  };
  const handleDailyAttendance = () => {
    try {
      axios
        .post("http://localhost:8070/api/attendance/dailyattendance", {
          moduleCode: moduleCod,
          date: daily,
        })
        .then((response) => {
          console.log(response.data);
          setDailyAttendance(response.data.enrolledStudents);
          setIsDisplay(false);
          setIsDailyDisplay(true);
        })
        .catch((error) => {
          console.error("Error fetching attendance", error);
        });
    } catch (error) {
      setMessage("Failed to get attendance");
    }
  };

  const generatePDF = () => {
    try {
      axios
        .post("http://localhost:8070/api/attendance/dailyattendance", {
          moduleCode: moduleCod,
          date : daily ? daily : date,
        })
        .then((response) => {
          console.log(response.data);
          setRes(response.data.enrolledStudents);
          const doc = new jsPDF();

          // Set document properties
          doc.setFontSize(12);

          // Add header section with module information
          doc.text(`Module Code: ${module.modCode}`, 10, 10);
          doc.text(`Module Name: ${module.modName}`, 10, 20);
          doc.text(`Date: ${date}`, 10, 30);
          doc.text(`Lecture Hours: ${lectureHours}`, 10, 40);

          // Define table headers and rows
          const headers = ["Name", "Registration Number", "Attendance State"];
          const data = res.map((student) => [
            student.name,
            student.regNo,
            student.attendanceData ? "Present" : "Absent",
          ]);

          // Add table with autoTable plugin
          doc.autoTable({
            head: [headers],
            body: data,
            startY: 50, // Starting y position for table
            margin: { top: 10 },
            styles: { fontSize: 12, cellPadding: 2, textColor: [0, 0, 0] },
            columnStyles: { 0: { fontStyle: "bold" } }, // Style the first column (Name) as bold
            headStyles: { fillColor: [165, 223, 255] }, // Header background color
            theme: "striped", // Apply striped rows theme
            didDrawCell: (data) => {
              // Add borders to all cells
              doc.setLineWidth(0.1);
              doc.line(
                data.cell.x,
                data.cell.y,
                data.cell.x,
                data.cell.y + data.cell.height
              ); // Vertical line
              doc.line(
                data.cell.x,
                data.cell.y,
                data.cell.x + data.cell.width,
                data.cell.y
              ); // Horizontal line
            },
          });

          // Save the PDF
          doc.save(`${moduleCode}_Attendance_Report.pdf`);
        })
        .catch((error) => {
          console.error("Error fetching attendance", error);
        });
    } catch (error) {
      console.error("Error fetching attendance", error);
    }

    // Create a new jsPDF instance
  };

  const createReport = (e) => {
    //get the all enrolled students by id
    try {
      axios
        .post("http://localhost:8070/api/modules/getenrollstu", {
          modCode: moduleCod,
        })
        .then((response) => {
          const enrolledStu = response.data;
          setEnrolledStudents(enrolledStu);
        })
        .catch((error) => {
          console.error("Error fetching students", error);
        });
    } catch (error) {
      setMessage("Failed to get students");
    }
    //cut the id part from the attendance data array
    //compare the two arrays and get the absent and present
    //display it in the report
  };

  const handleEndTimeChange = (endTime) => {
    setEndTime(endTime);
  };
  const handleStartTimeChange = (startTime) => {
    setStartTime(startTime);
  };

  const handleStartLec = (e) => {
    try {
      e.preventDefault();
      const lectureHour = (endTime - startTime) / 3600000;
      setLectureHours(lectureHour);
      if (date == null && startTime == null && endTime == null) {
        setMessage("Please set information to start the lecture!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else if (startTime === null && endTime === null) {
        setMessage("Please pick a time!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else if (startTime === null) {
        setMessage("Please pick a start time!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else if (endTime == null) {
        setMessage("Please pick a end time!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else if (date == null) {
        setMessage("Please pick a date!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        set(ref(fireDb, "State/"), {
          arduinoState: "3",
        });
        setSMessage("Getting attendance!");
      }
    } catch (error) {
      setMessage("Failed to start the lecture!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };
  const handleShowLec = (e) => {
    try {
      const attData = ref(fireDb, "Attendance/");

      onValue(attData, (snapshot) => {
        const attenData = snapshot.val(); // Update attendanceData inside the callback
        createReport();
        // Perform operations dependent on attendanceData here
        const updatedEnrolledStudents = enrolledStudents.map((student) => ({
          ...student,
          attendanceData: Object.values(attenData).includes(
            student.fingerprintID
          ),
        }));
        setRes(updatedEnrolledStudents);
        setIsDailyDisplay(false);
        setIsDisplay(true);
        console.log(res);
      });
    } catch (error) {
      console.error("Error retrieving attendance data:", error);
    }
  };

  const handleEndLec = (e) => {
    try {
      const attData = ref(fireDb, "Attendance/");

      onValue(attData, (snapshot) => {
        const attenData = snapshot.val(); // Update attendanceData inside the callback
        createReport();
        // Perform operations dependent on attendanceData here
        const updatedEnrolledStudents = enrolledStudents.map((student) => ({
          ...student,
          attendanceData: Object.values(attenData).includes(
            student.fingerprintID
          ),
        }));
        setRes(updatedEnrolledStudents);
        setIsDailyDisplay(false);
        setIsDisplay(true);
        console.log(res);

        axios
          .post("http://localhost:8070/api/attendance/addattendance", {
            enrolledStudents: updatedEnrolledStudents, // Pass updatedEnrolledStudents here
            moduleCode,
            startTime,
            endTime,
            date,
            lectureHours,
          })
          .then((response) => {
            if (response.data && response.data.error) {
              // Attendance adding unsuccessful due to existing attendance for the date
              setMessage(
                "Attendance Adding Unsuccessful: Attendance for this date already exists"
              );
            } else {
              // Attendance added successfully
              setSMessage("Attendance Added successfully!");
            }
            setTimeout(() => {
              setSMessage(null);
            }, 3000);
          })
          .catch((error) => {
            console.error("Error adding attendance", error);
          });

        set(ref(fireDb, "State/"), {
          arduinoState: "0",
        });
        setSMessage("Stopped Getting Attendance");
        setTimeout(() => {
          setSMessage(null);
        }, 3000);
      });
    } catch (error) {
      console.error("Error retrieving attendance data:", error);
    }
  };

  return (
    <div className="lecturer-first-row-container">
      <div className="topic-style">
        <p>
          <br />
          Dashboard
        </p>
      </div>
      <div className="path-style">
        <p style={{ opacity: 0.8 }}>
          <GoTriangleRight />
          Dashboard / {module.modCode} {module.modName}
        </p>
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {smessage && (
          <SuccessMessage variant="success">{smessage}</SuccessMessage>
        )}
      </div>
      <div className="second-container"> 
        <div className="second-column-frist-container">
          <div className="second-column-frist-container-three">
            <div className="card-box">
              <div className="row">
                <h6 className="box-title">Enrolled Students</h6>
                <div style={{ marginLeft: "45px" }}>
                  <BiDotsVerticalRounded
                    onClick={() => setShowCalendar(true)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="icon-cart">
                  <div className="cart-icon-style">
                    <BiUserCheck />
                  </div>
                </div>
                <div className="column">
                  <div className="count-of-stu">
                    <h3>{module.noOfStu}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-box">
              <div className="row">
                <h6 className="box-title">Absence</h6>
                <div style={{ marginLeft: "40px" }}>
                  <BiDotsVerticalRounded
                    onClick={() => setShowCalendar(true)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="icon-cart">
                  <div className="cart-icon-style">
                    <BiUserX />
                  </div>
                </div>
                <div className="column">
                  <div className="count-of-stu">
                    <h3>147</h3>
                  </div>
                  <div>
                    <h6 style={{ color: "red" }}>
                      12%
                      <span style={{ color: "gray", fontSize: "12px" }}>
                        {" "}
                        increase
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-box">
              <div className="row">
                <h6 className="box-title">Total Lecture Hours</h6>
                <div style={{ marginLeft: "3px", marginTop: "3px" }}>
                  <BiDotsVerticalRounded />
                </div>
              </div>
              <div className="row">
                <div className="icon-cart">
                  <div className="cart-icon-style">
                    <BiTachometer />
                  </div>
                </div>
                <div className="column">
                  <div className="count-of-stu">
                    <h3>{module.lecHours}</h3>
                  </div>
                  <div>
                    <h6 style={{ color: "blue" }}>
                      {module.conductedLectureHours}
                      <span style={{ color: "gray", fontSize: "12px" }}>
                        {" "}
                        conducted
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="report-container">
              <h6 className="box-title">
                <br />
                Reports
              </h6>
              <div className="module-form-report">
                <div className="row">
                  <p style={{ color: "gray", marginLeft: "15px" }}>
                    {/* {" "} */}
                    Date : {new Date().toLocaleDateString()}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={generatePDF}
                    style={{ marginLeft: "330px" }}
                  >
                    <PiDownloadSimpleBold style={{ fontSize: "18px" }} />{" "}
                    Download
                  </button>
                </div>
                {
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Reg No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Attendance</th>
                      </tr>
                    </thead>
                    {isDailyDisplay === true && dailyAttendance ? (
                      <tbody>
                        {dailyAttendance.map((student, index) => (
                          <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{student.regNo}</td>
                            <td>{student.fingerprintID}</td>
                            <td>
                              {student.attendanceData == true
                                ? "present"
                                : "absent"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : isDisplay === true && res ? (
                      <tbody>
                        {res.map((student, index) => (
                          <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{student.regNo}</td>
                            <td>{student.fingerprintID}</td>
                            <td>
                              {student.attendanceData == true
                                ? "present"
                                : "absent"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody></tbody>
                    )}
                  </table>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="second-column-second-container">
          <div className="lecture-details-box">
            <h6 className="box-title">Start Lecture</h6>
            <div className="column">
              <div className="row">
                <div className=" time-picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <DemoItem>
                        <div
                          className="time-label"
                          style={{ marginLeft: "10px" }}
                        >
                          Start Time
                        </div>
                        <TimePicker
                          defaultValue={dayjs("2022-04-17T15:30")}
                          onChange={handleStartTimeChange}
                          value={startTime}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className=" time-picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker"]}>
                      <DemoItem>
                        <div
                          className="time-label"
                          style={{ marginLeft: "10px" }}
                        >
                          End Time
                        </div>
                        <TimePicker
                          defaultValue={dayjs("2022-04-17T15:30")}
                          onChange={handleEndTimeChange}
                          value={endTime}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem>
                      <div
                        className="time-label"
                        style={{ marginLeft: "10px" }}
                      >
                        Date
                      </div>
                      <DatePicker
                        value={date}
                        views={["year", "month", "day"]}
                        onChange={handleCalendarChange}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div style={{ marginLeft: "15px", marginBottom: "10px" }}>
                <button
                  onClick={handleStartLec}
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                >
                  Start
                </button>
                <button
                  onClick={handleEndLec}
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                >
                  End
                </button>
                <button onClick={handleShowLec} className="btn btn-primary">
                  Show
                </button>
              </div>
            </div>
          </div>
          <div className="lecture-details-box">
            <h6 className="box-title">Daily Attendance</h6>
            <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DemoItem>
                    <div className="time-label" style={{ marginLeft: "10px" }}>
                      Conducted Date
                    </div>
                    <DatePicker
                      defaultValue={today}
                      views={["year", "month", "day"]}
                      value={daily}
                      onChange={handleDailyCalendarChange}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{ marginLeft: "15px", marginBottom: "10px" }}>
              <button
                onClick={handleDailyAttendance}
                className="btn btn-primary"
              >
                View
              </button>
            </div>
          </div>
          <div className="lecture-details-box">
            <h6 className="box-title">Overall Attendance Report</h6>
            <div style={{ marginLeft: "15px", marginBottom: "10px" }}>
              <button className="btn btn-primary">View</button>
            </div>
          </div>
        </div>
      </div>
      {showCalendar && (
        <div className="calendar-dropdown">
          <input
            type="date"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={(e) => handleCalendarChange(new Date(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default ModuleDetails;
