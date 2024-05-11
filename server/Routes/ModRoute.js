const express = require("express");
const router = express.Router();

const {createModule, getModules, getOwnModules, enrollModule,getEnrollStudents} = require("../Controllers/ModController")



router.post("/addmod", createModule);
router.get("/getallmod", getModules);
router.post("/ownmodules", getOwnModules);
router.put("/enrollmodule/:id", enrollModule);
router.post("/getenrollstu", getEnrollStudents);



module.exports = router;