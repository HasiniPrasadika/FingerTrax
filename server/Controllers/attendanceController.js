const Attendance = require("../Models/AttendanceModel");
const asyncHandler = require("express-async-handler");
const ModuleModel = require("../Models/ModuleModel");

const createAttendance = asyncHandler(async (req, res) => {
  const {
    moduleCode,
    startTime,
    endTime,
    date,
    lectureHours,
    enrolledStudents,
  } = req.body;

  const existingAttendance = await Attendance.findOne({ moduleCode, date });

  if (existingAttendance) {
    // Attendance already exists for the given moduleCode and date
    return res
      .status(400)
      .json({ message: "Attendance for this date already exists" });
  }
  const module = await ModuleModel.findOne({ modCode: moduleCode });

  if (!module) {
    return res.status(404).json({ message: "Module not found" });
  }

  // Calculate new conducted lecture hours
  const newConductedLectureHours = module.conductedLectureHours + lectureHours;

  // Update the module with new conducted lecture hours
  const updatedModule = await ModuleModel.findOneAndUpdate(
    { modCode: moduleCode },
    { $set: { conductedLectureHours: newConductedLectureHours } },
    { new: true }
  );

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
console.log(date);
  // Assuming you have a Attendance model defined with Mongoose
  const dailyAttendance = await Attendance.findOne({ moduleCode: moduleCode, date: date });
  console.log(dailyAttendance.date);

  res.json(dailyAttendance);
});
const getMyAttendance = asyncHandler(async (req, res) => {
  const { moduleCode } = req.body;

  // Assuming you have a Attendance model defined with Mongoose
  const myAttendance = await Attendance.find({ moduleCode: moduleCode });

  if (!myAttendance) {
    return res.status(404).json({ message: "Attendance not found" });
  }
  if (myAttendance) {
    res.status(201).json(myAttendance);
  } else {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  createAttendance,
  getAttendance,
  getDailyAttendance,
  getMyAttendance,
};
