const { Schema, model } = require("mongoose");

const genreSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, require: true },
  photo: { type: String, required: true },
});

const Genre = model("genre", genreSchema);

module.exports = Genre;
