const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel.js");
const generateToken = require("../util/SecretToken.js");
const cloudinary = require("../util/Cloudinary.js");
const { unsubscribe } = require("../Routes/AuthRoute.js");


//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { userName, password} = req.body;

  const user = await User.findOne({ userName });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      role: user.role,
      image: user.image,
      fullName: user.fullName,
      regNo: user.regNo,
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
  const { userName, password } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    userName,
    password,
    role : "admin",
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

//@description     Register new lecturer user
//@route           POST /api/users/
//@access          Public
const registerLecUser = asyncHandler(async (req, res) => {
  const { userName, password, fullName, depName, image, regNo } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  const result = await cloudinary.uploader.upload(image, {
    folder: "users"
  })
  const user = await User.create({
    userName,
    password,
    fullName,
    depName,
    image: {
      public_id: result.public_id,
      url: result.secure_url
    },
    regNo,
    role : "lecturer",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      role: user.role,
      fullName: user.fullName,
      depName: user.fullName,
      image: user.image,
      regNo: user.regNo,
      token: generateToken(user._id),
    });
  } else {
    console.error("Error registering lecturer:", error);
    res.status(500).json({ message: "Internal Server Error" });
    
  }
});

const registerStuUser = asyncHandler(async (req, res) => {
  const { userName, password, fullName, depName, image, regNo, fingerprintID, batch } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  const result = await cloudinary.uploader.upload(image, {
    folder: "users"
  })
  const user = await User.create({
    userName,
    password,
    fullName,
    depName,
    image: {
      public_id: result.public_id,
      url: result.secure_url
    },
    regNo,
    fingerprintID,
    batch,
    role : "student",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      role: user.role,
      fullName: user.fullName,
      depName: user.fullName,
      image: user.image,
      regNo: user.regNo,
      fingerprintID: user.fingerprintID,
      batch: user.batch,
      token: generateToken(user._id),
    });
  } else {
    console.error("Error registering lecturer:", error);
    res.status(500).json({ message: "Internal Server Error" });
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

const getLecUsers = asyncHandler(async (req, res) => {
  // Assuming you have a User model defined with Mongoose
  const lecusers = await User.find({ role: "lecturer" });
  res.json(lecusers);
});
const getStuUsers = asyncHandler(async (req, res) => {
  // Assuming you have a User model defined with Mongoose
  const stuusers = await User.find({ role: "student" });
  res.json(stuusers);
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // Assuming you have a User model defined with Mongoose
  const { userName } = req.body;
  const currentuser = await User.findOne({ userName: userName });
  res.json(currentuser);
});

const deleteLecUser = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.body.id);
  

  if (user) {
    if (user.image && user.image.public_id) {
      
      await cloudinary.uploader.destroy(user.image.public_id); // Delete image from cloudinary
    }
    await user.deleteOne();
    res.json({ message: "Lecturer removed" });
  } else {
    res.status(404);
    throw new Error("Lecturer not found");
  }
})

module.exports = { authUser,deleteLecUser, updateUserProfile, registerAdminUser, registerLecUser, registerStuUser, getLecUsers, getStuUsers, getCurrentUser };




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