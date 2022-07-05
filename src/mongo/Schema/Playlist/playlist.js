const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
  name: { type: String, required: true },
  // songs: { type: Array, default: [] },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
});

const Playlist = model("playlist", playlistSchema);

module.exports = Playlist;
