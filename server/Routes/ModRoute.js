const express = require("express");
const router = express.Router();
const {createModule, getModules, getOwnModules} = require("../Controllers/ModController")


router.post("/addmod", createModule);
router.get("/getallmod", getModules);
router.post("/ownmodules", getOwnModules);



module.exports = router;