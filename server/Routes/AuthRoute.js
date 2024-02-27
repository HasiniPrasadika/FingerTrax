
import {
  authUser,
  registerAdminUser,
  updateUserProfile,
} from "../Controllers/AuthController.js";
import { protect } from "../Middlewares/AuthMiddleware.js";
const router = express.Router();

router.route("/regadmin").post(registerAdminUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;


// const { Signup, Login } = require("../Controllers/AuthController");
// const {userVerification} = require("../Middlewares/AuthMiddleware");
// const router = require("express").Router();

// router.post("/signup", Signup);
// router.post("/login", Login);
// router.post('/',userVerification)

// module.exports = router;