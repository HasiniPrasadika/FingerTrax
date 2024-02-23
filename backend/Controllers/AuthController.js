const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { password, username, createdAt, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = new User({
      username: username,
      password: password,
      role: role, // Optional: provide the user's role
    });

    user.save()
  
   
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Incorrect password or username" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or username" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    switch (user.role) {
      case "admin":
        res.status(201).json({
          message: "Admin logged in successfully",
          success: true,
          role: "admin",
        });
        break;
      case "lecturer":
        res.status(201).json({
          message: "Lecturer logged in successfully",
          success: true,
          role: "lecturer",
        });
        break;
      case "student":
        res.status(201).json({
          message: "Student logged in successfully",
          success: true,
          role: "student",
        });
        break;
      default:
        res.json({ message: "Invalid role" });
        break;
    }

    next();
  } catch (error) {
    console.error(error);
  }
};
