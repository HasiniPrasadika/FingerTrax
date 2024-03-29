import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  BiDotsVerticalRounded,
  BiTachometer,
  BiUserCheck,
  BiUserX,
} from "react-icons/bi";
import { GoTriangleRight } from "react-icons/go";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocation } from "react-router-dom";

const today = dayjs();

const isInCurrentMonth = (date) => date.get("month") === dayjs().get("month");

const ModuleDetails = () => {
  const { state } = useLocation();
  const module = state.module;
  const [showCalendar, setShowCalendar] = useState(false);
  const [moduleCode, setModuleCode] = useState(module.modCode);
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleCalendarChange = (date) => {
    setDate(date);
    setShowCalendar(false);
  };

  const handleEndTimeChange = (endTime) => {
    setEndTime(endTime);
  };
  const handleStartTimeChange = (startTime) => {
    setStartTime(startTime);
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
                  {/* <div>
                                        <h6 style={{ color: 'green' }}>
                                            12%<span style={{ color: "gray", fontSize: "12px" }}> increase</span>
                                        </h6>
                                    </div> */}
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
                        defaultValue={today}
                        value={date}
                        onChange={handleCalendarChange}
                        views={["year", "month", "day"]}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div style={{ marginLeft: "15px", marginBottom: "10px" }}>
                <button className="btn btn-primary">Start</button>
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
                      shouldDisableMonth={isInCurrentMonth}
                      views={["year", "month", "day"]}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div style={{ marginLeft: "15px", marginBottom: "10px" }}>
              <button className="btn btn-primary">View</button>
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
