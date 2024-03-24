const express = require("express");
const router = express.Router();
const {createModule, getModules, getModulesByDepcode} = require("../Controllers/ModController")


router.post("/addmod", createModule);
router.get("/getallmod", getModules);
router.post("/getmodulebydepcode", getModulesByDepcode)



module.exports = router;