const express = require("express");
const router = express.Router();
const { addDepartment, getDepartments, getOneDepartment, deleteDepartment, updateDepartment } = require("../Controllers/DepController.js");



router.post("/adddep", addDepartment);
router.get("/getalldep", getDepartments);
router.post("/getonedepartment", getOneDepartment);
router.post("/depdel", deleteDepartment);
router.put("/updatedep/:id", updateDepartment);


module.exports = router;