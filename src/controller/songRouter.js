const express = require("express");
const Song = require("../mongo/Schema/Song/song");
const songRouter = express.Router();
const { isAdmin } = require("../middleware/middleware");

// const { songsList } = require('./dataSongs/songsList')

songRouter.get("/", async (req, res) => {
  const { query: queryParams } = req;
  let query = {};
  if (queryParams.search) {
    query = {
      $or: [
        { title: { $regex: queryParams.search, $options: "i" } },
        { soundUrl: { $regex: queryParams.search, $options: "i" } },
      ],
    };
  }
  const allSongs = await Song.find(query)
    .populate({
      path: "artist",
      select: "name",
    })
    .populate("genre");
  res.json(allSongs);
});

songRouter.get("/search", async (req, res) => {
  const search = req.query.search || "";
  const song = await Song.find({ artist: { $regex: search, $options: "i" } });
});

songRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const song = await Song.findById(id)
      .populate({
        path: "artist",
        select: "name",
      })
      .populate("genre");
    if (!song) {
      return res.status(404).send();
    }
    return res.json(song);
  }

  return res.status(404).send();
});

songRouter.post("/", isAdmin, async (req, res) => {
  const body = req.body;

  const data = {
    title: body.title,
    duration: body.duration,
    genre: body.genre,
    releaseYear: body.releaseYear,
    soundUrl: body.soundUrl,
    photo: body.photo,
    artist: body.artist,
  };

  const newSong = new Song(data);

  await newSong.save();

  const song = await Song.findById(newSong._id).populate({
    path: "artist",
    select: "name",
  });

  res.json(song);
});

songRouter.patch("/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (id !== undefined) {
    const song = await Song.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!song) {
      return res.status(400).send();
    }

    return res.json(song);
  }

  return res.status(404).send();
});

songRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const song = await Song.findByIdAndRemove(req.params.id);
    if (!song) {
      return res.status(404).send();
    }
    return res.status(200).send({ message: "Song Deleted" });
  }
  return res.status(404).send();
});

module.exports = songRouter;
