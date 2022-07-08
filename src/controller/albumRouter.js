const express = require("express");
const Album = require("../mongo/Schema/Album/album");
const albumRouter = express.Router();
import { isAdmin } from "../middleware/middleware";

albumRouter.get("/album", async (req, res) => {
  const album = await Album.find();
  res.json(album);
});

albumRouter.get("/album/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(400).send;
    }

    res.json(album);
  }

  return res.status(404).send();
});

albumRouter.post("/album", async (req, res) => {
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

albumRouter.patch("album/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  if (id !== undefined) {
    const album = await Album.findByIdAndUpdate(id);
    if (!album) {
      return res.json(400).send();
    }

    res.json(album);
  }
  return res.status(404).send();
});

albumRouter.delete("/album/:id", async (req, res) => {
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
