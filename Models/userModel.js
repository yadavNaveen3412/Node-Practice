const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!!"],
    unique: true,
    lowercase: true,
    validate: [
      validator.isEmail,
      "Please enter email in correct format (abc@xyz.com)",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter your password!!"],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password!!"],
    validate: {
      validator: function (val) {
        return val == this.password;
      },

      message: "Password and Confirm Passwrod does not match!!",
    },
  },
  photo: String,    
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.comparePasswordInDb = async function(pswd, pswdDB) {
    return await bcrypt.compare(pswd, pswdDB)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
