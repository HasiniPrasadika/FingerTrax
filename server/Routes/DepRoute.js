const express = require("express");
const router = express.Router();
const { addDepartment, getDepartments } = require("../Controllers/DepController.js");



router.post("/adddep", addDepartment);
router.get("/getalldep", getDepartments);


module.exports = router;