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
    default: 0
  },
  enrolKey: {
    type: String,
  },
  modCoordinator: {
    type: String,
  },
  lectureHours: {
    type: String,
  },
  depCode: {
    type: String,
  },
  lecturers: [{
    regNo: String,
  }],
  students: [{
    regNo: String,
  }],
  semester: {
    type: String,
  }

  // other module details
});

module.exports = mongoose.model("Module", moduleSchema);


