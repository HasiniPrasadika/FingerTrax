const Attendance = require("../Models/AttendanceModel");
const asyncHandler = require("express-async-handler");

const createAttendance = asyncHandler(async (req, res) => {
  const { moduleCode, startTime, endTime, date, lectureHours, enrolledStudents } = req.body;

  const existingAttendance = await Attendance.findOne({ moduleCode, date });

  if (existingAttendance) {
    // Attendance already exists for the given moduleCode and date
    return res.status(400).json({ message: "Attendance for this date already exists" });
  }


  const attendance = await Attendance.create({

    moduleCode,
    lectureHours,
    startTime,
    endTime,
    date,
    enrolledStudents: enrolledStudents,
  });

  if (attendance) {
    res.status(201).json({
      _id: attendance._id,
      moduleCode: attendance.moduleCode,
      lectureHours: attendance.lectureHours,
      startTime: attendance.startTime,
      endTime: attendance.endTime,
      date: attendance.date,
      enrolledStudents: attendance.enrolledStudents,
    });
  } else {
    console.error("Error adding attendance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
const getAttendance = asyncHandler(async (req, res) => {
  const attendances = await Attendance.find();
  res.json(attendances);
});

const getDailyAttendance = asyncHandler(async (req, res) => {
  const { moduleCode, date } = req.body;

  // Assuming you have a Attendance model defined with Mongoose
  const dailyAttendance = await Attendance.findOne({ moduleCode: moduleCode, date: date });

  res.json(dailyAttendance);
});
module.exports = { createAttendance, getAttendance, getDailyAttendance };
