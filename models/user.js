import mongoose from "mongoose";
import crypto from "crypto"; //crypto is built in node package so no need doing npm i crypto

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.methods.createResetPassword = function () {
  //reset token should be a random token not necessarily a complex stuff here using the random byte method from builtIn crypto module
  //crypto.randomBytes(specify number of characters).convert to hexadecimal string
  //Do not store plain token in the database for hackers not to have access
  const resetToken = crypto.randomBytes(32).toString("hex");
  //we create a hash to hash our resetToken
  //after hashing, we need to create a new field in database so we can compare it with token the user provides
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //Date.now + 10 is to give 10minutes * 60seconds * 1000milseconds
  this.passwordResetExpires = Date.now + 10 * 60 * 1000;
  console.log({resetToken}, this.passwordResetToken)
  return resetToken;
};

export default mongoose.model("User", userSchema);
