const Module = require("../Models/ModuleModel");
const asyncHandler = require("express-async-handler");

const createModule = asyncHandler(async (req, res) => {
  const { modCode, modName, enrolKey, semester, lectureHours } = req.body;

  const modExists = await Module.findOne({ modCode });

  if (modExists) {
    res.status(404);
    throw new Error("Module already exists");
  }
  const module = await Module.create({
    modCode,
    modName,
    enrolKey,
    semester,
    lectureHours,
  });

  if (module) {
    res.status(201).json({
      _id: module._id,
      modCode: module.modCode,
      modName: module.modName,
      enrolKey: module.enrolKey,
      semester: module.semester,
      lectureHours: module.lectureHours,
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

module.exports = { createModule, getModules};
