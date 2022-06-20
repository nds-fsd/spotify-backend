const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");



const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User = model("register", UserSchema);

module.exports = User;

