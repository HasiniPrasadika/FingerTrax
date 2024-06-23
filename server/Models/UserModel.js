const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin"
    },
    fullName: String,
    regNo: String,
    depName: String,
    batch: String,
    fingerprintID: String,
    image: {
      public_id: String,
      url: String    
      
    },
    enrolledModules: [
      {
        modCode: String,
      }
    ],
    attendance: [{
      modCode: String,
      attendanceID: String,
      status: Boolean,

    }],
    email: {
      type: String,
      unique: true,
     
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    
  }

);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model("User", userSchema);


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

