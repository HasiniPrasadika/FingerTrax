const express = require("express");
const router = express.Router();

const {createModule, getModules, getOwnModules, getModulesByDepcode} = require("../Controllers/ModController")



router.post("/addmod", createModule);
router.get("/getallmod", getModules);
router.post("/getmodulebydepcode", getModulesByDepcode);
router.post("/ownmodules", getOwnModules);




module.exports = router;