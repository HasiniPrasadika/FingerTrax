const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  
  enrolledStudents: [{
    fingerprintID: String,
    regNo: String,
    attendanceData: Boolean,
    name: String,
  }],
  moduleCode: String,
  lectureHours: Number,
  startTime: Date,
  endTime: Date,
  date: Date,
  // other attendance details like fingerprint ID, etc.
});

module.exports = mongoose.model('Attendance', attendanceSchema);
