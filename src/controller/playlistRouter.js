const express = require("express");
const Playlist = require("../mongo/Schema/Playlist/playlist");
const playlistRouter = express.Router();

playlistRouter.get("/playlist", async (req, res) => {
  const playlist = await Playlist.find();
  res.json(playlist);
});

playlistRouter.get("/playlist/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res.status(400).send();
    }
    res.json(playlist);
  }
  return res.status(404).send();
});

playlistRouter.get("/playlist/search", async (req, res) => {
  const playlist = await Playlist.find(req.body);
  res.json(playlist);
});

playlistRouter.post("/playlist", async (req, res) => {
  const body = req.body;

  const data = {
    name: body.name,
    songs: body.songs,
  };

  const newPlaylist = new Playlist(data);
  await newPlaylist.save();
  res.json(newPlaylist);
});

playlistRouter.patch("/playlist/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (id !== undefined) {
    const playlist = await Playlist.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!playlist) {
      return res.status(400).send();
    }
    return res.json(playlist);
  }
  return res.status(404).send();
});

playlistRouter.delete("/playlist/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const playlist = await Playlist.findByIdAndRemove(req.params.id, {
      returnOriginal: true,
    });
    if (!playlist) {
      return res.status(400).send();
    }
    return res.status(200).send({ message: "Playlist Deleted" });
  }
  return res.status(404).send();
});

module.exports = playlistRouter;