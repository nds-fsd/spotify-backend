const router = require("express").Router();
const UserService = require("./UserService");
const { isAdmin } = require("../middleware/middleware");
const { User } = require("../mongo/Schema/User/User");

router.get("/user", async (req, res) => {
  const { query: queryParams } = req;
  let query = {};
  if (queryParams.search) {
    query = {
      $or: [
        { name: { $regex: queryParams.search, $options: "i" } },
        { email: { $regex: queryParams.search, $options: "i" } },
      ],
    };
  }
  const user = await UserService.find(query);
  res.json(user);
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const user = await UserService.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    return res.json(user);
  }
  return res.status(404).send();
});

router.post("/user", isAdmin, async (req, res) => {
  const document = req.body;
  const user = await UserService.create(document);
  return res.status(201).json(user);
});

router.patch("/user/:id", async (req, res) => {
  const document = req.body;
  const { id } = req.params;
  const user = await UserService.update(id, document);
  if (id !== undefined) {
    const user = await UserService.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    return res.json(user);
  }

  return res.status(404).send();
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const song = await User.findByIdAndRemove(req.params.id);
    if (!song) {
      return res.status(404).send();
    }
    return res.status(200).send();
  }
  return res.status(404).send();
});

module.exports = router;
