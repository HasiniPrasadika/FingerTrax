const express = require("express");
const router = express.Router();
const {createModule, getModules} = require("../Controllers/ModController")


router.post("/addmod", createModule);
router.get("/getallmod", getModules);



module.exports = router;