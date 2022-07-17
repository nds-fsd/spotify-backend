const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
  name: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: "song" }],
  photo: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "register" },
});

const Playlist = model("playlist", playlistSchema);

module.exports = Playlist;
