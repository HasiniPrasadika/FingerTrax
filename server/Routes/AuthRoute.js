const express = require("express");
const router = express.Router();
const { authUser, registerAdminUser, registerLecUser, registerStuUser, updateUserProfile, getLecUsers } = require("../Controllers/AuthController.js");
const { protect } = require("../Middlewares/AuthMiddleware.js");

router.post("/regadmin", registerAdminUser);
router.post("/reglec", registerLecUser);
router.post("/regstu", registerStuUser);
router.post("/login", authUser);
router.post("/profile", protect, updateUserProfile);
router.get("/getlecusers", getLecUsers);

module.exports = router;


// const { Signup, Login } = require("../Controllers/AuthController");
// const {userVerification} = require("../Middlewares/AuthMiddleware");
// const router = require("express").Router();

// router.post("/signup", Signup);
// router.post("/login", Login);
// router.post('/',userVerification)

// module.exports = router;