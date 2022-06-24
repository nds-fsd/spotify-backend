const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



/*UserSchema.pre("save", function (next){
  if (this.isNew || this.isModified("password")){
    const document = this;
    
    bcrypt.hash(document.password, saltRounds,  (err, hashedPassword) => {
      if(err) {
        next(err);
      }else {
        document.password = hashedPassword;
        next();

      }
      
    });
  }else{
    next()
  }
})*/

const User = model("register", UserSchema);

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    name: this.name,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};









module.exports = User;

