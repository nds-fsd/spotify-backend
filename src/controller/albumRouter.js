const express = require("express");
const Album = require("../mongo/Schema/Album/album");
const albumRouter = express.Router();
const { isAdmin } = require("../middleware/middleware");

albumRouter.get("/album", async (req, res) => {
  const { query: queryParams } = req;
  let query = {};
  if (queryParams.search) {
    query = {
      $or: [{ name: { $regex: queryParams.search, $options: "i" } }],
    };
  }
  let limit = undefined;

  if (queryParams.limit) {
    limit = queryParams.limit;
  }
  const album = await Album.find(query, null, { limit })
    // .populate({ path: "songs", select: "title" })
    .populate("artist")
    .populate("songs");
  res.json(album);
});

albumRouter.get("/album/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const album = await Album.findById(id).populate("artist").populate("songs");
    if (!album) {
      return res.status(404).send();
    }

    res.json(album);
  }

  return res.status(404).send();
});

albumRouter.post("/album", isAdmin, async (req, res) => {
  const { body } = req;

  const data = {
    name: body.name,
    photo: body.photo,
    releaseYear: body.releaseYear,
    artist: body.artist,
    songs: body.songs,
  };

  const newAlbum = new Album(data);
  await newAlbum.save();
  res.json(newAlbum);
});

albumRouter.patch("/album/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (id !== undefined) {
    const album = await Album.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!album) {
      return res.json(400).send();
    }
    return res.json(album);
  }
  return res.status(404).send();
});

albumRouter.delete("/album/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const album = await Album.findByIdAndDelete(id);
    if (!album) {
      return res.status(400).send();
    }
    return res.status(200).send({ message: "Album Deleted" });
  }
  return res.status(404).send();
});

module.exports = albumRouter;
