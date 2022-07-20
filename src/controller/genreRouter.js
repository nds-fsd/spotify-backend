const express = require("express");
const Genre = require("../mongo/Schema/Genre/genre");
const genreRouter = express.Router();

genreRouter.get("/genre", async (req, res) => {
  const genre = await Genre.find();
  res.json(genre);
});

genreRouter.get("/genre/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(404).send();
    }
    res.json(genre);
  }
  return res.status(404).send();
});

genreRouter.post("/genre", async (req, res) => {
  const { body } = req;

  const data = {
    name: body.name,
    description: body.description,
  };
  const newGenre = new Genre(data);

  await newGenre.sabe();
  res.json(newGenre);
});

genreRouter.patch("/genre/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (id !== undefined) {
    const genre = await Genre.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!genre) {
      return res.json(400).send();
    }
    return res.json(genre);
  }
  return res.status(404).send();
});

genreRouter.delete("/genre/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const genre = await Genre.findByIdAndDelete(id);
    if (!genre) {
      return res.status(400).send();
    }
    return res.status(200).send({ message: "Genre deleted" });
  }
  return res.status(404).send();
});

module.exports = genreRouter;
