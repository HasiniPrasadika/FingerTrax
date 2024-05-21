const ModuleModel = require("../Models/ModuleModel");
const Module = require("../Models/ModuleModel");
const User = require("../Models/UserModel")
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

const enrollModule = asyncHandler(async(req,res)=>{

  const moduleId = req.params.id;
  const {noOfStu, students} = req.body;

  const updateModule = {
    noOfStu, students
  };

  await ModuleModel.findByIdAndUpdate(moduleId,updateModule).then((updatedModule)=>{
    res.status(200).send({status:"module enroll",updatedModule})
  }).catch((err)=>{
    console.error(err);
  })

});

const getEnrollStudents = asyncHandler(async(req,res)=>{

    
    const {modCode} = req.body;

    // Find the module by its code
    const module = await Module.findOne({ modCode });

    if (!module) {
      return res.status(404).json({ message: 'Module not found'});
    }

    // Get array of students' registration numbers from the module
    const regNos = module.students.map(student => student.regNo);

    // Find students in the User collection with these registration numbers
    const students = await User.find({ regNo: { $in: regNos } });

    // Create an array with registration numbers and corresponding fingerprint IDs
    const regNosAndFingerprintIDs = students.map(student => ({
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
})






module.exports = { createModule, getModules, deleteModule, getOwnModules,enrollModule,getEnrollStudents};

