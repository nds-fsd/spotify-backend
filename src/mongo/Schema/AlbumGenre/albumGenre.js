const { Schema, model } = require("mongoose");

const albumGenreSchema = new Schema({
  album: [{ type: Schema.Types.ObjectId, ref: "Album" }],
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

const AlbumGenre = model("albumGenre", albumGenreSchema);

module.exports = AlbumGenre;
