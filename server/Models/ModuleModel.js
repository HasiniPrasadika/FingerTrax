const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  modCode: {
    type: String,
    unique: true,
  },
  modName: {
    type: String,
  },
  noOfStu: {
    type: Number,
    default: 0,
  },
  enrolKey: {
    type: String,
    unique: true,
  },

  modCoordinator: {
    regNo: String,
    userName: String,
    fullName: String,
  },
  lecHours: {
    type: Number,
    default: 0,
  },
  conductedLectureHours: {
    type: Number,
    default: 0,
  },
  department: {
    type: String,
  },
  lecturers: [
    {
      regNo: String,
      userName: String,
      fullName: String,
    },
  ],
  students: [
    {
      regNo: String,
    },
  ],
  semester: {
    type: String,
  },

  // other module details
});

module.exports = mongoose.model("Module", moduleSchema);
