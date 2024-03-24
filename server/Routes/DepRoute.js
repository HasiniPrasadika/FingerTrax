const express = require("express");
const router = express.Router();
const { addDepartment, getDepartments, getOneDepartment } = require("../Controllers/DepController.js");



router.post("/adddep", addDepartment);
router.get("/getalldep", getDepartments);
router.post("/getonedepartment", getOneDepartment)


module.exports = router;