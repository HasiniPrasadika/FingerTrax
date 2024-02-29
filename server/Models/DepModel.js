const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  depCode: {
    type: String,
    unique: true,
   
  },
  depName: {
    type: String,
  },
  noOfStu: {
    type: String,
  },
  noOfLec: {
    type: String,
  },
});

module.exports = mongoose.model("Department", departmentSchema);
