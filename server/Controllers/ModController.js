const ModuleModel = require("../Models/ModuleModel");
const Module = require("../Models/ModuleModel");
const User = require("../Models/UserModel");
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
  const coordinatorUser = await User.findOne({ userName: modCoordinator });
  if (!coordinatorUser) {
    res.status(404);
    throw new Error("Module Coordinator not found");
  }

  if (modExists) {
    res.status(404);
    throw new Error("Module already exists");
  }
  const module = await Module.create({
    modCode,
    modName,
    enrolKey,
    modCoordinator: {
      regNo: coordinatorUser.regNo,
      userName: coordinatorUser.userName,
      fullName: coordinatorUser.fullName,
    },
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

const updateModule = asyncHandler(async (req, res) => {
  const { modCode, modName, enrolKey, semester, lecHours, department } =
    req.body;
  const ModuleId = req.params.id;

  const module = await Module.findById(ModuleId);

  if (module) {
    module.modCode = modCode;
    module.modName = modName;
    module.enrolKey = enrolKey;
    module.semester = semester;
    module.lecHours = lecHours;
    module.department = department;

    const updatedModule = await module.save();

    res.json({
      _id: updatedModule._id,
      modCode: updatedModule.modCode,
      modName: updatedModule.modName,
      enrolKey: updatedModule.enrolKey,
      semester: updatedModule.semester,
      lecHours: updatedModule.lecHours,
      department: updatedModule.department,
    });
  } else {
    res.status(404);
    throw new Error("Department not found");
  }
});

const getModuleByCode = asyncHandler(async (req, res) => {
  const { modCode } = req.body; // Assuming modCode is passed as a route parameter
  try {
    const module = await Module.findOne({ modCode: modCode });

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json(module);
  } catch (error) {
    console.error("Error fetching module:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Get All Module
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

// Enroll Module

const enrollModule = asyncHandler(async (req, res) => {
  const moduleId = req.params.id;
  const { noOfStu, students } = req.body;

  const updateModule = {
    noOfStu,
    students,
  };

  await ModuleModel.findByIdAndUpdate(moduleId, updateModule)
    .then((updatedModule) => {
      res.status(200).send({ status: "module enroll", updatedModule });
    })
    .catch((err) => {
      console.error(err);
    });
});

const getEnrollStudents = asyncHandler(async (req, res) => {
  const { modCode } = req.body;

  // Find the module by its code
  const module = await Module.findOne({ modCode });

  if (!module) {
    return res.status(404).json({ message: "Module not found" });
  }

  // Get array of students' registration numbers from the module
  const regNos = module.students.map((student) => student.regNo);

  // Find students in the User collection with these registration numbers
  const students = await User.find({ regNo: { $in: regNos } });

  // Create an array with registration numbers and corresponding fingerprint IDs
  const regNosAndFingerprintIDs = students.map((student) => ({
    regNo: student.regNo,
    name: student.fullName,
    fingerprintID: student.fingerprintID,
    attendanceData: false,
  }));

  res.json(regNosAndFingerprintIDs);
});

const deleteModule = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.body.id);

  if (module) {
    await module.deleteOne();
    res.json({ message: "Module removed" });
  } else {
    res.status(404);
    throw new Error("Module not found");
  }
});

const giveAccessToLecturer = asyncHandler(async (req, res) => {
  const { modCode, modName, regNo, modCoordinate } = req.body;
  

  try {
    // Check if the module exists
   

    const module = await Module.findOne({ modCode, modName });

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    if (module.modCoordinator.userName !== modCoordinate) {
      return res.status(403).json({ message: "You don't have the access to give access" });
    }

    // Check if the lecturer is already in the module's lecturer list
    const lecturerExists = module.lecturers.some(
      (lecturer) => lecturer.regNo === regNo
    );

    if (lecturerExists) {
      return res.status(400).json({ message: "Lecturer already has access" });
    }

    // Get user details from the User collection
    const user = await User.findOne({ regNo });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add lecturer details to the module's lecturer list
    module.lecturers.push({
      userName: user.userName,
      fullName: user.fullName,
      regNo: user.regNo,
    });

    // Save the updated module
    await module.save();

    res.status(200).json({ message: "Access granted successfully", module });
  } catch (error) {
    console.error("Error granting access:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  createModule,
  getModules,
  deleteModule,
  getOwnModules,
  enrollModule,
  getEnrollStudents,
  getModuleByCode,
  updateModule,
  giveAccessToLecturer,
};
