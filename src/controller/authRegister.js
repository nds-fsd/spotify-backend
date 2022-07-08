const dotenv = require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");
const UserService = require("./UserService");
const express = require("express");
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

const { User, generateJWT } = require("../mongo/Schema/User/User");
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  await UserService.findOne({ email })
    .then(async (user) => {
      if (!user)
        return res
          .status(400)
          .json({ error: { email: "This email is not registred" } });

      const correctPasswrod = await user.correctPasswrod(password);
      if (!correctPasswrod)
        return res.status(400).json({ error: { password: "Wrong password" } });

      res.status(200).json({
        token: generateJWT(user),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    })
    .cath((err) => res.status(500).json({ message: err.message }));
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
      res.status(500).json({ succes: false, message: err.stack })
    );
});

/*const configSecurity = (app) => {
  app.use(
    "/",
    jwt({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
      path: ["/login", "/register"],
    })
  );
};*/

module.exports = {
  authRouter,
  //configSecurity,
};
