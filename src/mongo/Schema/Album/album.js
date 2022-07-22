const { Schema, model } = require("mongoose");

const albumSchema = new Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  releaseYear: { type: Date, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "Artist" },
  song: [{ type: Schema.Types.ObjectId, ref: "Song" }],
});

const Album = model("album", albumSchema);

module.exports = Album;
