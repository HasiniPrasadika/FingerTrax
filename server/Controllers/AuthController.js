const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel.js");
const generateToken = require("../util/SecretToken.js");
const cloudinary = require("../util/Cloudinary.js");
const { unsubscribe } = require("../Routes/AuthRoute.js");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

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
    role: "admin",
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

const changeAdminPassword = asyncHandler(async (req, res) => {
  const { userName, currentPassword, newpassword, email, username } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // Generate salt and hash new password

    // Update user's password
    user.password = newpassword;
    user.userName = userName;
    user.email = email;
    await user.save();
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fingertrax22@gmail.com",
        pass: "yvpwcljinqdwuqzl", // Use environment variables or a secure method to store your password
      },
    });

    const mailOptions = {
      from: "fingertrax22@gmail.com",
      to: user.email,
      subject: "Admin Details changed",
      text: `Dear Admin,\n\nAdmin Password, Username and Email has been changed.\n\nBest Regards,\nFingerTrax Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Details changed successfully" });
  } catch (error) {
    console.error("Error changing details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//@description     Register new lecturer user
//@route           POST /api/users/
//@access          Public
const registerLecUser = asyncHandler(async (req, res) => {
  const { userName, password, fullName, depName, image, regNo, email } =
    req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  let result = {
    public_id: "",
    url: "/Images/profile.webp", // Default image URL
  };
  if (image) {
    result = await cloudinary.uploader.upload(image, {
      folder: "users",
    });
  }

  const user = await User.create({
    userName,
    password,
    fullName,
    depName,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    regNo,
    role: "lecturer",
    email,
  });

  if (user) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fingertrax22@gmail.com",
        pass: "yvpwcljinqdwuqzl", // Use environment variables or a secure method to store your password
      },
    });

    const mailOptions = {
      from: "fingertrax22@gmail.com",
      to: email,
      subject: "Registration Successful",
      text: `Dear ${fullName},\n\nYou have been successfully registered to FingerTrax.\n\nBest Regards,\nFingerTrax Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      password: user.password,
      role: user.role,
      fullName: user.fullName,
      depName: user.fullName,
      image: user.image,
      regNo: user.regNo,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    console.error("Error registering lecturer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { username, currentPassword, newpassword } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ userName: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // Generate salt and hash new password

    // Update user's password
    user.password = newpassword;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fingertrax22@gmail.com",
        pass: "yvpwcljinqdwuqzl", // Use environment variables or a secure method to store your password
      },
    });

    const mailOptions = {
      from: "fingertrax22@gmail.com",
      to: user.email,
      subject: "Password Changed",
      text: `Dear ${user.fullName},\n\nYour Password has been changed.\n\nBest Regards,\nFingerTrax Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateLecturer = asyncHandler(async (req, res) => {
  const lecID = req.params.id;
  const { userName, fullName, depName, image, regNo, password, email } = req.body;

  const user = await User.findById(lecID);

  if (!user) {
    res.status(404);
    throw new Error("Lecturer not found");
  }

  // Check if the username already exists for a different user
  const userExists = await User.findOne({ userName, _id: { $ne: lecID } });
  if (userExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  let imageData = user.image;
  if (image && image !== user.image.url) {
    // Delete the existing image from Cloudinary
    if (user.image.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    // Upload the new image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "users",
    });
    imageData = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  user.userName = userName;
  user.fullName = fullName;
  user.depName = depName;
  user.image = imageData;
  user.regNo = regNo;
  user.email = email;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    userName: updatedUser.userName,
    fullName: updatedUser.fullName,
    depName: updatedUser.depName,
    image: updatedUser.image,
    regNo: updatedUser.regNo,
    role: updatedUser.role,
  });
});

const updatephoto = asyncHandler(async (req, res) => {
  const { username, image } = req.body;

  const user = await User.findOne({ userName: username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }


  let imageData = user.image;
  if (image && image !== user.image.url) {
    // Delete the existing image from Cloudinary
    if (user.image.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    // Upload the new image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "users",
    });
    imageData = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  user.image = imageData;  

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    userName: updatedUser.userName,
    fullName: updatedUser.fullName,
    depName: updatedUser.depName,
    image: updatedUser.image,
    regNo: updatedUser.regNo,
    role: updatedUser.role,
  });
});

const registerStuUser = asyncHandler(async (req, res) => {
  const {
    userName,
    password,
    fullName,
    depName,
    image,
    regNo,
    fingerprintID,
    batch,
    email,
  } = req.body;

  const userExists = await User.findOne({ userName });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }
  let result = {
    public_id: "",
    url: "/Images/profile.webp", // Default image URL
  };
  if (image) {
    result = await cloudinary.uploader.upload(image, {
      folder: "users",
    });
  }
  const user = await User.create({
    userName,
    password,
    fullName,
    depName,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    regNo,
    fingerprintID,
    batch,
    role: "student",
    email,
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
      email: user.email,
      fingerprintID: user.fingerprintID,
      batch: user.batch,
      token: generateToken(user._id),
    });
  } else {
    console.error("Error registering lecturer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
const updateStudent = asyncHandler(async (req, res) => {
  const stuID = req.params.id;
  const { userName, fullName, depName, image, regNo, batch, email } = req.body;

  const user = await User.findById(stuID);

  if (!user) {
    res.status(404);
    throw new Error("Student not found");
  }

  // Check if the username already exists for a different user
  const userExists = await User.findOne({ userName, _id: { $ne: stuID } });
  if (userExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  let imageData = user.image;
  if (image && image !== user.image.url) {
    // Delete the existing image from Cloudinary
    if (user.image.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    // Upload the new image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "users",
    });
    imageData = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  user.userName = userName;
  user.fullName = fullName;
  user.depName = depName;
  user.image = imageData;
  user.regNo = regNo;
  user.batch = batch;
  user.email = email;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    userName: updatedUser.userName,
    fullName: updatedUser.fullName,
    depName: updatedUser.depName,
    image: updatedUser.image,
    regNo: updatedUser.regNo,
    role: updatedUser.role,
  });
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
  console.log(user);

  if (user) {
    if (user.image && user.image.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id); // Delete image from cloudinary
    }
    
    await user.deleteOne();
    console.log("hi");
    res.json({ message: "Lecturer removed" });
  } else {
    res.status(404);
    throw new Error("Lecturer not found");
  }
});


module.exports = {
  authUser,
  deleteLecUser,
  updateUserProfile,
  registerAdminUser,
  registerLecUser,
  registerStuUser,
  getLecUsers,
  getStuUsers,
  getCurrentUser,
  updateLecturer,
  updateStudent,
  changePassword,
  updatephoto,
  changeAdminPassword,
  
};

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
