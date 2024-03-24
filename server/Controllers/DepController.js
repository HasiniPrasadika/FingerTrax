const asyncHandler = require("express-async-handler");
const Department = require("../Models/DepModel");

const addDepartment = asyncHandler(async (req, res) => {
  const { depCode, depName, noOfStu, noOfLec } = req.body;

  const depExists = await Department.findOne({ depCode });

  if (depExists) {
    res.status(404);
    throw new Error("Department already exists");
  }

  const department = await Department.create({
    depCode,
    depName,
    noOfStu,
    noOfLec
  });

  if (department) {
    res.status(201).json({
      _id: department._id,
      depCode: department.depCode,
      depName: department.password,
      noOfStu: department.noOfStu,
      noOfLec: department.noOfLec
    });
  } else {
    console.error("Error adding department:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

// Get one department

const getOneDepartment = asyncHandler(async (req, res) => {
  const {depCode} = req.body;

    const oneDepartment = await Module.findOne({depcode: depCode});
    res.json(oneDepartment);
});



module.exports = {addDepartment, getDepartments,getOneDepartment};




