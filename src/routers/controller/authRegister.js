
const express = require("express");
const User = require("../../mongo/Schema/User/User")
const RegisterRouter = express.Router();


RegisterRouter.post("/register", async (req, res) => {
    const {body} = req;

    const data = {
      name: body.name,
      password: body.password,
      email: body.email,
    };
  
    const User = new User(data);
  
    await User.save();

    
  
    res.json(User);
  });


  module.exports = RegisterRouter;
