const { Schema, model } = require("mongoose");

const songsSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  photo: { type: String, required: true },
});

const MySongs = model("songs", songsSchema);

module.exports = MySongs;
