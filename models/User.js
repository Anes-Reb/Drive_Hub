const mongoose = require("mongoose");
const { Schema } = mongoose;
const argon2 = require("argon2");

const UserSchema = new Schema({
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
  },
});

// Pre-save middleware to hash password
UserSchema.pre("save", async function (next) {
  try {
    //can add salt here
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
    next(); //move to next middleware
  } catch (error) {
    //console.log("Error on pre save : ", error);
    throw new Error("failed to hash password : " + error.message);
  }
});

// Method to compare password on the login of the user
UserSchema.methods.comparePassword = async function (userPassword) {
  try {
    return await argon2.verify(this.password, userPassword);
  } catch (error) {
    //console.log("Error on comparing password : ", error);
    throw new Error("failed to compare password : " + error.message);
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
