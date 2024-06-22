const express = require("express");
const router = express.Router();

const {createModule, getModules,deleteModule, getOwnModules, enrollModule,getEnrollStudents, getModuleByCode, updateModule, giveAccessToLecturer} = require("../Controllers/ModController")



router.post("/addmod", createModule);
router.get("/getallmod", getModules);
router.post("/ownmodules", getOwnModules);
router.put("/enrollmodule/:id", enrollModule);
router.post("/getenrollstu", getEnrollStudents);
router.post("/moddel", deleteModule);
router.post("/getmodulebymodulecode", getModuleByCode);
router.put("/updatemod/:id", updateModule);
router.post("/giveaccess", giveAccessToLecturer);



module.exports = router;