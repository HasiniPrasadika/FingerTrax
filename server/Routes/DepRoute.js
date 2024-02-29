const express = require("express");
const router = express.Router();
const { addDepartment } = require("../Controllers/DepController.js");



router.post("/adddep", addDepartment);


module.exports = router;