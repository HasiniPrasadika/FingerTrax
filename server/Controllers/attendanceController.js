const Attendance = require("../Models/AttendanceModel");
const asyncHandler = require("express-async-handler");

const createAttendance = asyncHandler(async (req, res) => {
  const { moduleCode, startTime, endTime, date, lectureHours } = req.body;


  const attendance = await Attendance.create({
    moduleCode,
    lectureHours,
    startTime,
    endTime,
    date,
  });

  if (attendance) {
    res.status(201).json({
      _id: attendance._id,
      moduleCode: attendance.moduleCode,
      lectureHours: attendance.lectureHours,
      startTime: attendance.startTime,
      endTime: attendance.endTime,
      date: attendance.date,
    });
  } else {
    console.error("Error adding attendance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { createAttendance };
