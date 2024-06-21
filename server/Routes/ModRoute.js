const express = require("express");
const router = express.Router();

const {createModule, getModules,deleteModule, getOwnModules, enrollModule,getEnrollStudents, getModuleByCode, updateModule} = require("../Controllers/ModController")



router.post("/addmod", createModule);
router.get("/getallmod", getModules);
router.post("/ownmodules", getOwnModules);
router.put("/enrollmodule/:id", enrollModule);
router.post("/getenrollstu", getEnrollStudents);
router.post("/moddel", deleteModule);
router.post("/getmodulebymodulecode", getModuleByCode);
router.put("/updatemod/:id", updateModule);



module.exports = router;