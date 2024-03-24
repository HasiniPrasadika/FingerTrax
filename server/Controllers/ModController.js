const Module = require("../Models/ModuleModel");
const asyncHandler = require("express-async-handler");

const createModule = asyncHandler(async (req, res) => {
  const {
    modCode,
    modName,
    enrolKey,
    modCoordinator,
    semester,
    lecHours,
    department,
  } = req.body;

  const modExists = await Module.findOne({ modCode });

  if (modExists) {
    res.status(404);
    throw new Error("Module already exists");
  }
  const module = await Module.create({
    modCode,
    modName,
    enrolKey,
    modCoordinator,
    semester,
    lecHours,
    department,
  });

  if (module) {
    res.status(201).json({
      _id: module._id,
      modCode: module.modCode,
      modName: module.modName,
      enrolKey: module.enrolKey,
      modCoordinator: module.modCoordinator,
      semester: module.semester,
      lecHours: module.lecHours,
      department: module.department,
    });
  } else {
    console.error("Error adding module:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getModules = asyncHandler(async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
});

const getOwnModules = asyncHandler(async (req, res) => {
  // Assuming you have a User model defined with Mongoose
  const { modCoordinator } = req.body;
  const ownmodules = await User.find({ modCoordinator: modCoordinator });
  res.json(ownmodules);
});

module.exports = { createModule, getModules, getOwnModules };
