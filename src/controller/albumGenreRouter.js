const express = require("express");
const AlbumGenre = require("../mongo/Schema/AlbumGenre/albumGenre");
const Album = require("../mongo/Schema/Album/album");
const Genre = require("../mongo/Schema/Genre/genre");
const albumGenreRouter = express.Router();

genreRouter.post("/albumgenre", async (req, res) => {
  const { body } = req;

  const data = {
    albumid: body.albumid,
    genreids: body.genreids,
  };
  data.genreids.map(g=> {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).send();
    }

    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(404).send();
    }

    const newAlbumGenre = new AlbumGenre(data.albumid, g);
    await newAlbumGenre.save();
  })

  res.status(200).send();
});

// genreRouter.post("/albumgenre", async (req, res) => {
//   const { body } = req;

//   const data = {
//     albumid: body.albumid,
//     genreid: body.genreid,
//   };

//   const album = await Album.findById(id);
//   if (!album) {
//     return res.status(404).send();
//   }

//   const genre = await Genre.findById(id);
//   if (!genre) {
//     return res.status(404).send();
//   }

//   const newAlbumGenre = new AlbumGenre(data);
//   await newAlbumGenre.save();

//   res.json(newAlbumGenre);
// });

genreRouter.patch("/albumgenre", async (req, res) => {
  const { body } = req;

  const data = {
    albumid: body.albumid,
    genreid: body.genreid,
  };

  const album = await Album.findById(id);
  if (!album) {
    return res.status(404).send();
  }

  const genre = await Genre.findById(id);
  if (!genre) {
    return res.status(404).send();
  }

  const newAlbumGenre = new AlbumGenre(data);
  await newAlbumGenre.findOneAndUpdate({
    album: data.albumid,
    genre: data.genreid,
  });

  res.json(newAlbumGenre);
});

genreRouter.delete("/albumgenre", async (req, res) => {
  const { body } = req;

  const data = {
    albumid: body.albumid,
    genreid: body.genreid,
  };

  const album = await Album.findById(id);
  if (!album) {
    return res.status(404).send();
  }

  const genre = await Genre.findById(id);
  if (!genre) {
    return res.status(404).send();
  }

  const newAlbumGenre = new AlbumGenre(data);
  await newAlbumGenre.findOneAndDelete({
    album: data.albumid,
    genre: data.genreid,
  });

  res.json(newAlbumGenre);
});
