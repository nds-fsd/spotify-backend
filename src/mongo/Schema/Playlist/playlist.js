const { Schema, model } = require("mongoose");

const playlistSchema = new Schema({
  name: { type: String, required: true },
  song: [{ type: Schema.Types.ObjectId, ref: "song" }],
  photo: { type: String, required: false },
  description: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: "register" },
});

const Playlist = model("playlist", playlistSchema);

module.exports = Playlist;
