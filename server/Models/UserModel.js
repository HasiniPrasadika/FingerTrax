import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: [true, "Your role is required"],
    },
    fullName: {
      type: String,
    },
    regNo: {
      type: String,
    },
    depName: {
      type: String,
    },
    batch: {
      type: String,
    },
    fingerprintID: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Your username is required"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Your password is required"],
//   },
//   role: {
//     type: String,
//     required: [true, "Your role is required"],

//   },

// });

// UserSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });

// module.exports = mongoose.model("User", UserSchema);
