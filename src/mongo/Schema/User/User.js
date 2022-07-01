const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (password) {
  console.log(password);
  return bcrypt.compare(password, this.password);
};

const generateJWT = function (user) {
  const today = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

const User = model("register", UserSchema);

module.exports = { User, generateJWT };
