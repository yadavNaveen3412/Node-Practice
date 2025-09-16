const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
    select: false,
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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  photo: String,

  resetPasswordToken: String,
  resetPasswordTokenExpires: Date,
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.comparePasswordInDb = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB);
};

userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
