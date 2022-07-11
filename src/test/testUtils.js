const UserService = require("../controller/UserService");
exports.createUser = () => {
  const userData = {
    name: "Test user",
    email: "test@user.com",
    password: "12345678",
  };
  return UserService.create(userData);
};
