import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import generateToken from "../util/SecretToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { userName, password, role } = req.body;

  const user = await User.findOne({ userName });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerAdminUser = asyncHandler(async (req, res) => {
  const { userName, password, role } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    userName,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { authUser, updateUserProfile, registerAdminUser };




// const User = require("../Models/UserModel");
// const { createSecretToken } = require("../util/SecretToken");
// const bcrypt = require("bcrypt");

// module.exports.Signup = async (req, res, next) => {
//   try {
//     const { username, password, role } = req.body;
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.json({ message: "User already exists" });
//     }
//     const user = await User.create({ username, password, role });
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });
//     res
//       .status(201)
//       .json({ message: "User signed in successfully", success: true, user });
//     next();
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports.Login = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     if(!username || !password ){
//       return res.json({message:'All fields are required'})
//     }
//     const user = await User.findOne({ username });
//     if(!user){
//       return res.json({message:'Incorrect password or email' }) 
//     }
//     const auth = await bcrypt.compare(password,user.password)
//     if (!auth) {
//       return res.json({message:'Incorrect password or email' }) 
//     }
//      const token = createSecretToken(user._id);
//      res.cookie("token", token, {
//        withCredentials: true,
//        httpOnly: false,
//      });
//      res.status(201).json({ message: "Admin logged in successfully", success: true, role: user.role });
//      next()
//   } catch (error) {
//     console.error(error);
//   }
// }