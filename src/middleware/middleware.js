exports.isAdmin = (req, res, next) => {
  if (req.auth.role !== "ADMIN") {
    return res.status(403).send();
  }
  next();
};
