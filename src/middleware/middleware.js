const { User } = require("../mongo/Schema/User/User");

exports.isAdmin = (req, res, next) => {
  if (req.auth.role !== "ADMIN") {
    return res.status(403).send();
  }
  next();
};

// exports.authUser = (req, res, next) => {
//   //crear un middleware que recoja el usuario logado con token?
//   //solo el admin o el user logado puede hacer get/playlist
//   //Endpoints GET ONE DELETE y PATCH solo deber ser accesibles por ADMIN o el user = authUSER
// };

