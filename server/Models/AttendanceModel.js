const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  
  students: [{
    fingerprintID: String,
  }],
  moduleCode: String,
  lectureHours: Number,
  startTime: Date,
  endTime: Date,
  date: Date,
  // other attendance details like fingerprint ID, etc.
});

module.exports = mongoose.model('Attendance', attendanceSchema);
