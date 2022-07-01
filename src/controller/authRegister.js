const dotenv = require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");
const UserService = require("./UserService");
const express = require("express");
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const { findOne } = require("./UserService");

const { User, generateJWT } = require("../mongo/Schema/User/User");
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("paso por aqui");
  const user = await UserService.findOne({ email });
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .json({ error: { email: "This email is not registred" } });
  }

  const correctPassword = await user.comparePassword(password);
  console.log(correctPassword);
  if (!correctPassword) {
    return res.status(400).json({ error: { password: "Wrong password" } });
  }
  return res.status(200).json({
    token: generateJWT(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

authRouter.post("/register", async (req, res) => {
  await UserService.findOne({ email: req.body.email })
    .then((user) => {
      if (user)
        return res
          .status(400)
          .json({ error: { email: "This email is already registred." } });

      const salt = bcrypt.genSaltSync(10);
      UserService.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, salt),
      })
        //mirar tema hasheo en clase
        .then((user) => {
          res.status(200).json({
            token: generateJWT(user),
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.stack })
    );
});

const configSecurity = (app) => {
  app.use(
    "/",
    jwt({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
      path: ["/login", "/register", "/songs"],
    })
  );
};

module.exports = {
  authRouter,
  configSecurity,
};
