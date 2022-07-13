const express = require("express");
<<<<<<< HEAD
const Song = require("../mongo/Schema/Song/songs");
const songRouter = express.Router();
// const { songsList } = require('./dataSongs/songsList')
=======
const Song = require("../mongo/Schema/Song/song");
const songRouter = express.Router();
>>>>>>> 6a4dbe0e01a14db8e92de409dfa1bbfcb0c55582

songRouter.get("", async (req, res) => {
  const allSongs = await Song.find();
  res.json(allSongs);
});

songRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).send();
    }
    return res.json(song);
  }

  return res.status(404).send();
});

songRouter.post("", async (req, res) => {
  const body = req.body;

  const data = {
    title: body.title,
    duration: body.duration,
    genre: body.genre,
    releaseDate: body.releaseDate,
    photo: body.photo,
  };

  const newSong = new Song(data);

  await newSong.save();

  res.json(newSong);
});

songRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (id !== undefined) {
    const song = await Song.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!song) {
      return res.status(404).send();
    }

    return res.json(song);
  }

  return res.status(404).send();
});

songRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const song = await Song.findByIdAndRemove(req.params.id, {
      returnOriginal: true,
    });
    if (!song) {
      return res.status(404).send();
    }
    return res.status(200).send({ message: "Song Deleted" });
  }
  return res.status(404).send();
});

<<<<<<< HEAD
//me elimina el primer elemento de mi bbdd
//preguntar findByIdAndDelete y findOneAndDelete

=======
>>>>>>> 6a4dbe0e01a14db8e92de409dfa1bbfcb0c55582
module.exports = songRouter;
