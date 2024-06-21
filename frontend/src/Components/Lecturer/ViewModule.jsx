import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/en";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  BiDotsVerticalRounded,
  BiTachometer,
  BiUserCheck,
} from "react-icons/bi";
import { GoTriangleRight } from "react-icons/go";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { fireDb } from "../../firebase";
import { db } from "../../firebase";
import { doc, getDoc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import { ref, set, onValue } from "firebase/database";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";
import "./Lecturer Styles/ViewModule.css";
const today = dayjs();

const ViewModule = () => {
  const [isDisplay, setIsDisplay] = useState(false); //display table for current attendance
  const [isDailyDisplay, setIsDailyDisplay] = useState(false); //display table for daily attendance
  const [isOverallDisplay, setIsOverallDisplay] = useState(false);

  const location = useLocation();
  const { module } = location.state || {};
  const moduleCod = module.modCode;

  const [showCalendar, setShowCalendar] = useState(false);
  const [showDailyCalendar, setShowDailyCalendar] = useState(false);

  const [moduleCode, setModuleCode] = useState(module.modCode);
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startDTime, setStartDTime] = useState(null);
  const [endDTime, setEndDTime] = useState(null);

  const [startState, setStartState] = useState(null);
  const [endState, setEndState] = useState(null);
  const [viewState, setViewState] = useState(null);
  const [overallState, setOverallState] = useState(null);

  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);

  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [lectureHours, setLectureHours] = useState();
  const [res, setRes] = useState();
  const [daily, setDaily] = useState(null);
  const [dailyAttendance, setDailyAttendance] = useState();

  const [studentAttendanceRecords, setStudentAttendanceRecords] = useState([]);

  const fetchAttendanceRecords = async () => {
    setDaily(null);
    setDate(null);
    setOverallState("Overall");

    try {
      const response = await axios.post(
        "http://localhost:8070/api/attendance/getmyattendance",
        {
          moduleCode: module.modCode,
        }
      );
      if (response.data) {
        setViewState(null);
        setEndState(null);
        setOverallState("Overall");

        setStudentAttendanceRecords(response.data);
        setIsDailyDisplay(false);
        setIsDisplay(false);
        setIsOverallDisplay(true);
      } else {
        setIsDailyDisplay(false);
        setIsDisplay(false);
        setIsOverallDisplay(false);
        setMessage("You did not conductued lectures for this module!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error fetching attendance records", error);
    }
  };
  const calculateAttendancePercentage = (student, studentAttendanceRecords) => {
    const totalAttendedHours = studentAttendanceRecords.reduce(
      (total, record) => {
        const studentRecord = record.enrolledStudents.find(
          (s) => s.regNo === student.regNo
        );
        return (
          total +
          (studentRecord && studentRecord.attendanceData
            ? record.lectureHours
            : 0)
        );
      },
      0
    );
    return Math.round(
      (totalAttendedHours / module.conductedLectureHours) * 100
    );
  };

  const handleCalendarChange = (date) => {
    setDate(date);
    setDaily(null);
    setShowCalendar(false);
  };
  const handleDailyCalendarChange = (date) => {
    setDaily(date);
    setDate(null);
    setShowDailyCalendar(false);
  };
  const handleDailyAttendance = () => {
    setOverallState(null);
    setIsOverallDisplay(false);
    if (daily) {
      try {
        axios
          .post("http://localhost:8070/api/attendance/dailyattendance", {
            moduleCode: moduleCod,
            date: daily,
          })
          .then((response) => {
            if (response.data == null) {
              setIsDisplay(false);
              setIsDailyDisplay(false);
              setIsOverallDisplay(false);
              setSMessage("No Lectures that Day!");
              setTimeout(() => {
                setSMessage(null);
              }, 3000);
            } else {
              setDailyAttendance(response.data.enrolledStudents);
              setLectureHours(response.data.lectureHours);
              setStartDTime(response.data.startTime);
              setEndDTime(response.data.endTime);
              console.log(response.data.enrolledStudents);
              setIsDisplay(false);
              setIsOverallDisplay(false);
              setIsDailyDisplay(true);
              setOverallState(null);
              setEndState(null);
              setViewState("View");
            }
          })
          .catch((error) => {
            setIsDisplay(false);
            setIsDailyDisplay(false);
            setIsOverallDisplay(false);
            setMessage("Error Fetching Attendance!");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      } catch (error) {
        setIsDisplay(false);
        setIsDailyDisplay(false);
        setIsOverallDisplay(false);
        setMessage("Error Fetching Attendance!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } else {
      setMessage("Please pick a date first!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const generatePDF = async () => {
    if (
      (endState == "End" && date) ||
      (viewState == "View" && daily) ||
      overallState == "Overall"
    ) {
      if (overallState == "Overall") {
        try {
          const response = await axios.post(
            "http://localhost:8070/api/attendance/getmyattendance",
            {
              moduleCode: module.modCode,
            }
          );
          if (response.data) {
            const doc = new jsPDF();

            // Set document properties
            doc.setFontSize(12);

            doc.text(`${module.department}`, 10, 10);
            doc.text(`Module Code: ${module.modCode}`, 10, 20);
            doc.text(`Module Name: ${module.modName}`, 10, 30);
            doc.text(`Date: ${dayjs(today).format("YYYY-MM-DD")}`, 10, 40);

            // Define table headers and rows
            const headers = [
              "Name",
              "Registration Number",
              "Attendance Percentage",
            ];
            const data = response.data[0].enrolledStudents.map((student) => [
              student.name,
              student.regNo,
              calculateAttendancePercentage(student, response.data) + "%",
            ]);
            doc.autoTable({
              head: [headers],
              body: data,
              startY: 50, // Starting y position for table
              margin: { top: 15 },
              styles: {
                fontSize: 12,
                cellPadding: 2,
                textColor: [0, 0, 0],
              },

              headStyles: { fillColor: [192, 192, 192] }, // Header background color
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
            doc.save(`${moduleCode}_Overall_Attendance_Report.pdf`);
          } else {
            setMessage("You did not conductued lectures for this module!");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
        } catch (error) {
          console.error("Error fetching attendance records", error);
        }
      } else {
        try {
          axios
            .post("http://localhost:8070/api/attendance/dailyattendance", {
              moduleCode: moduleCod,
              date: daily,
            })
            .then(async (response) => {
              console.log(response.data);
              setRes(response.data.enrolledStudents);
              const doc = new jsPDF();

              // Set document properties
              doc.setFontSize(12);

              // Add header section with module information

              doc.text(`${module.department}`, 10, 10);
              doc.text(`Module Code: ${module.modCode}`, 10, 20);
              doc.text(`Module Name: ${module.modName}`, 10, 30);
              doc.text(
                `Date: ${dayjs(daily ? daily : date).format("YYYY-MM-DD")}`,
                10,
                40
              );
              doc.text(`Lecture Hours: ${lectureHours}`, 10, 50);
              doc.text(
                `Lecture Time: ${new Date(
                  startDTime
                ).toLocaleTimeString()} - ${new Date(
                  endDTime
                ).toLocaleTimeString()}`,
                10,
                60
              );

              // Define table headers and rows
              const headers = [
                "Name",
                "Registration Number",
                "Attendance State",
              ];
              const data = response.data.enrolledStudents.map((student) => [
                student.name,
                student.regNo,
                student.attendanceData ? "Present" : "Absent",
              ]);
              doc.autoTable({
                head: [headers],
                body: data,
                startY: 70, // Starting y position for table
                margin: { top: 15 },
                styles: { fontSize: 12, cellPadding: 2, textColor: [0, 0, 0] },

                headStyles: { fillColor: [192, 192, 192] }, // Header background color
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
              doc.save(
                `${moduleCode}_${dayjs(daily ? daily : date).format(
                  "YYYY-MM-DD"
                )}_Attendance_Report.pdf`
              );

              // Add table with autoTable plugin

              // Save the PDF
            })
            .catch((error) => {
              console.error("Error fetching attendance", error);
            });
        } catch (error) {
          console.error("Error fetching attendance", error);
        }
      }
    } else {
      setMessage("Please Conduct a Lecture or Go to the Daily Attendance!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    // Create a new jsPDF instance
  };

  const handleEndTimeChange = (endTime) => {
    setEndTime(endTime);
  };
  const handleStartTimeChange = (startTime) => {
    setStartTime(startTime);
  };

  const handleStartLec = (e) => {
    setIsDisplay(false);
    setIsDailyDisplay(false);
    setIsOverallDisplay(false);
    setDaily(null);
    setOverallState(null);
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
        setMessage("Please pick the time!");
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
        set(ref(db, "State/"), {
          arduinoState: "3",
        });
        setSMessage("Getting attendance!");
        setEndState(null);
        setOverallState(null);
        setStartState("Start");
      }
    } catch (error) {
      setMessage("Failed to start the lecture. Try Again!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleEndLec = async (e) => {
    setOverallState(null);
    if (startState == "Start") {
      try {
        const docRef = doc(fireDb, "Attendance", "StuID");

        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        const attenData = Object.keys(docSnap.data());
        try {
          axios
            .post("http://localhost:8070/api/modules/getenrollstu", {
              modCode: moduleCod,
            })
            .then((response) => {
              const enrolledStu = response.data;

              const updatedEnrolledStudents = enrolledStu.map((student) => ({
                ...student,
                attendanceData: Object.values(attenData).includes(
                  student.fingerprintID
                ),
              }));
              setRes(updatedEnrolledStudents);
              setIsDailyDisplay(false);
              setIsOverallDisplay(false);
              setIsDisplay(true);
              console.log(updatedEnrolledStudents);
              try {
                const doc = new jsPDF();

                // Set document properties
                doc.setFontSize(12);
                // Add header section with module information
                doc.text(`${module.department}`, 10, 10);
                doc.text(`Module Code: ${module.modCode}`, 10, 20);
                doc.text(`Module Name: ${module.modName}`, 10, 30);
                doc.text(`Date: ${dayjs(date).format("YYYY-MM-DD")}`, 10, 40);
                doc.text(`Lecture Hours: ${lectureHours}`, 10, 50);
                doc.text(
                  `Lecture Time: ${new Date(
                    startTime
                  ).toLocaleTimeString()} - ${new Date(
                    endTime
                  ).toLocaleTimeString()}`,
                  10,
                  60
                );

                // Define table headers and rows
                const headers = [
                  "Name",
                  "Registration Number",
                  "Attendance State",
                ];
                const data = updatedEnrolledStudents.map((student) => [
                  student.name,
                  student.regNo,
                  student.attendanceData ? "Present" : "Absent",
                ]);

                // Add table with autoTable plugin
                doc.autoTable({
                  head: [headers],
                  body: data,
                  startY: 70, // Starting y position for table
                  margin: { top: 15 },
                  styles: {
                    fontSize: 12,
                    cellPadding: 2,
                    textColor: [0, 0, 0],
                  },

                  headStyles: { fillColor: [192, 192, 192] }, // Header background color
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
              } catch (err) {
                console.log("error generating pdf");
              }

              axios
                .post("http://localhost:8070/api/attendance/addattendance", {
                  enrolledStudents: updatedEnrolledStudents, // Pass updatedEnrolledStudents here
                  moduleCode,
                  startTime,
                  endTime,
                  date,
                  lectureHours,
                })
                .then(async (response) => {
                  if (response.data && response.data.error) {
                    setMessage(
                      "Attendance Adding Unsuccessful: Attendance for this date already exists"
                    );
                  } else {
                    setSMessage("Attendance Added successfully!");
                    setTimeout(() => {
                      setSMessage(null);
                    }, 3000);
                    set(ref(db, "State/"), {
                      arduinoState: "0",
                    });
                    setSMessage("Stopped Getting Attendance");
                    setTimeout(() => {
                      setSMessage(null);
                    }, 3000);
                    setViewState(null);
                    setOverallState(null);
                    setEndState("End");
                    const data = docSnap.data();

                    // Get all field names
                    const fieldNames = Object.keys(data);

                    // Delete each field individually
                    const batch = fieldNames.reduce((batch, fieldName) => {
                      return updateDoc(docRef, {
                        [fieldName]: deleteField(),
                      });
                    }, updateDoc(docRef, {})); // Create an initial updateDoc operation

                    await batch;

                    console.log("All fields deleted successfully.");
                  }
                  setTimeout(() => {
                    setSMessage(null);
                  }, 3000);
                })
                .catch((error) => {
                  console.error("Error adding attendance", error);
                });
            })
            .catch((error) => {
              console.error("Error fetching students", error);
            });
        } catch (error) {
          setMessage("Failed to get students");
        }

        // Update attendanceData inside the callback

        // Perform operations dependent on attendanceData here
      } catch (error) {
        console.error("Error retrieving attendance data:", error);
      } finally {
        setStartState(null);
      }
    } else {
      setMessage("First Start the Lecture!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };
  if (!module) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lecturer-view-module-container">
      <div className="view-module-navigate">
        <span>
          <GoTriangleRight />
          Dashboard / {module.modCode} {module.modName}
        </span>
      </div>
      <div className="view-module-topic">
        <span>Attendance Settings</span>
      </div>

      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {smessage && (
        <SuccessMessage variant="success">{smessage}</SuccessMessage>
      )}
      <div className="attendance-dash">
        <div className="attendance-dash-left">
          <div className="attendance-dash-left-top">
            <div className="enrolled-stu-count">
              <div className="enrolled-stu-count-top">
                <h6 className="enrolled-stu-count-top-text">
                  Enrolled Students
                </h6>
                <div className="enrolled-stu-count-top-text">
                  <BiDotsVerticalRounded />
                </div>
              </div>
              <hr style={{ width: "100%", marginTop: 0, marginBottom: 0 }} />
              <div className="enrolled-stu-count-top">
                <div className="enrolled-stu-count-top-text-first">
                  <BiUserCheck />
                </div>
                <h3 className="enrolled-stu-count-top-text-first">
                  {module.noOfStu}
                </h3>
              </div>
            </div>
            <div className="enrolled-stu-count">
              <div className="enrolled-stu-count-top">
                <h6 className="enrolled-stu-count-top-text">
                  Total Lecture Hours
                </h6>
                <div className="enrolled-stu-count-top-text">
                  <BiDotsVerticalRounded />
                </div>
              </div>
              <hr style={{ width: "100%", marginTop: 0, marginBottom: 0 }} />
              <div className="enrolled-stu-count-top">
                <div className="enrolled-stu-count-top-text-first">
                  <BiTachometer />
                </div>
                <div className="enrolled-stu-count-top-text-second">
                  <h3>{module.lecHours}</h3>
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

          <div className="attendance-dash-left-bottom">
            <div className="report-topic-dev">
              <h6>Reports</h6>
            </div>
            <div className="module-att-report">
              <div className="report-first-row">
                <p>
                  Date :{" "}
                  {daily
                    ? dayjs(daily).format("YYYY-MM-DD")
                    : date
                    ? dayjs(date).format("YYYY-MM-DD")
                    : dayjs(today).format("YYYY-MM-DD")}
                </p>

                <button className="btn btn-primary" onClick={generatePDF}>
                  <PiDownloadSimpleBold /> Download
                </button>
              </div>
              <div className="report-second-row">
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
                            <td>{student.name}</td>
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
                            <td>{student.name}</td>
                            <td>
                              {student.attendanceData == true
                                ? "present"
                                : "absent"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : isOverallDisplay === true &&
                      studentAttendanceRecords ? (
                      <tbody>
                        {studentAttendanceRecords[0].enrolledStudents.map(
                          (student, index) => (
                            <tr key={index}>
                              <th scope="row">{index}</th>
                              <td>{student.regNo}</td>
                              <td>{student.name}</td>
                              <td>
                                {calculateAttendancePercentage(
                                  student,
                                  studentAttendanceRecords
                                )}
                                %
                              </td>
                            </tr>
                          )
                        )}
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
        <div className="attendance-dash-right">
          <div className="report-details-box">
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
              </div>
            </div>
          </div>

          <div className="report-details-box">
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

          <div className="report-details-box">
            <h6 className="box-title">Overall Attendance Report</h6>
            <div style={{ marginLeft: "15px", marginBottom: "10px" }}>
              <button
                onClick={fetchAttendanceRecords}
                className="btn btn-primary"
              >
                View
              </button>
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

export default ViewModule;
