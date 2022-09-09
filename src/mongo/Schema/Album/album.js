const { Schema, model } = require("mongoose");

const albumSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "artist" },
  songs: [{ type: Schema.Types.ObjectId, ref: "song" }],
});

const Album = model("album", albumSchema);

module.exports = Album;
