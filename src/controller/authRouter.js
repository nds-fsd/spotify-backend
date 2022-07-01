const dotenv = require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");
const UserService = require("./UserService");
const express = require("express");
const jwtSecret = process.env.JWT_SECRET;

const { generateJWT, comparePassword } = require("../mongo/Schema/User/User");
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserService.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ error: { email: "This email is not registred" } });
  }
  const correctPassword = await comparePassword(user,password);
  if (!correctPassword) {
    return res.status(400).json({ error: { password: "Wrong password" } });
  }
  return res.status(200).json({
    token: generateJWT(user),
    user,
  });
});

authRouter.post("/register", async (req, res) => {
  const existingUser = await UserService.findOne({email: req.body.email});
  if(existingUser){
    return res.status(400).json({error: {email: "This email is already registered." }});
  }

  try{
    const newUser = await UserService.create(req.body);
    return res.status(200).json({
      token: generateJWT(newUser),
      user: newUser
    })
  }catch(e){
    return res.status(500).json(e);
  }
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
