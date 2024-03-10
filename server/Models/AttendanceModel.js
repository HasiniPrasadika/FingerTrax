const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  attendanceID: {
    type: String,
    unique: true,

  },
  students: [{
    fingerprintID: String,
  }],
  moduleCode: String,
  lectureTime: Number,
  date: Date,
  // other attendance details like fingerprint ID, etc.
});

module.exports = mongoose.model('Attendance', attendanceSchema);
