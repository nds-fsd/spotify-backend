const express = require("express");
const Artists = require("../mongo/Schema/Artists/artists");
const artistRouter = express.Router();
const { isAdmin } = require("../middleware/middleware");

artistRouter.get("/artist", async (req, res) => {
  const { query: queryParams } = req;
  let query = {};
  if (queryParams.search) {
    query = {
      $or: [
        { name: { $regex: queryParams.search, $options: "i" } },
        { bio: { $regex: queryParams.search, $options: "i" } },
      ],
    };
  }
  let limit = undefined;

  if (queryParams.limit) {
    limit = queryParams.limit;
  }
  const allArtists = await Artists.find(query, null, { limit })
    .populate({
      path: "albums",
      select: "name",
    })
    .populate("song");

  res.json(allArtists);
});

artistRouter.get("/artist/:id", async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const artists = await Artists.findById(id);
    if (!artists) {
      return res.status(404).send();
    }
    res.json(artists);
  }
  return res.status(404).send();
});

artistRouter.post("/artist", isAdmin, async (req, res) => {
  const body = req.body;

  const data = {
    name: body.name,
    photo: body.photo,
    bio: body.bio,
    monthlyUsers: body.monthlyUsers,
    albums: body.albums,
    song: body.song,
  };

  const newArtist = new Artists(data);

  await newArtist.save();
  res.json(newArtist);
});

artistRouter.patch("/artist/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (id !== undefined) {
    const artists = await Artists.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!artists) {
      return res.status(404).send();
    }
    return res.json(artists);
  }
  return res.status(404).send();
});

artistRouter.delete("/artist/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  if (id !== undefined) {
    const artist = await Artists.findByIdAndRemove(req.params.id, {
      returnOriginal: true,
    });
    if (!artist) {
      return res.status(400).send();
    }
    return res.status(200).send({ message: "Artist Deleted" });
  }
  return res.status(404).send();
});

module.exports = artistRouter;
