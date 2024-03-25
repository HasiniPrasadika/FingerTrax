const express = require("express");
const router = express.Router();

const {createModule, getModules, getOwnModules, enrollModule} = require("../Controllers/ModController")



router.post("/addmod", createModule);
router.get("/getallmod", getModules);
router.post("/ownmodules", getOwnModules);
router.put("/enrollmodule/:id", enrollModule);




module.exports = router;