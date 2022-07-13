const { Schema, model } = require("mongoose");
//const Artists = require("../Artists/artists");
const Artists = require("./artists");


const songSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  photo: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId,
  ref: Artists,
  required: true
}
});

const Song = model("song", songsSchema);

module.exports = Song;
