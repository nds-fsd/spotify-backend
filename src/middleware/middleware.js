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

exports.authUser = async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  if (req.auth.id !== user.id) {
    return res.status(403).send();
  }
  req.user = user;
  next();
};
