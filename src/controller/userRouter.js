const router = require("express").Router();
const UserService = require("./UserService");
const { isAdmin } = require("../middleware/middleware");

router.get("/user", async (req, res) => {
  const user = await UserService.find();
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

router.put("/user/:id", async (req, res) => {
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

module.exports = router;
