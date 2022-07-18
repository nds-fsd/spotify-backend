const { Schema, model } = require("mongoose");

const albumGenreSchema = new Schema({
  Album: { type: id, rquire: true },
  Genre: { type: id, require: true },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "ADMIN",
    required: true,
  },
});

const AlbumGenre = model("albumGenre", albumGenreSchema);

module.exports = AlbumGenre;
