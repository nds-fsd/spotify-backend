const { Schema, model } = require("mongoose");

const genreSchema = new Schema({
  name: { type: String, required: false },
  description: { type: String, require: false },
  photo: { type: String, required: false },
  song: [{ type: Schema.Types.ObjectId, ref: "song" }],
});

const Genre = model("genre", genreSchema);

module.exports = Genre;
