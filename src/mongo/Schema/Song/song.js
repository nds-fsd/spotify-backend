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

<<<<<<< HEAD:src/mongo/Schema/songs.js
const Song = model("song", songsSchema);
=======
const Song = model("song", songSchema);
>>>>>>> 6a4dbe0e01a14db8e92de409dfa1bbfcb0c55582:src/mongo/Schema/Song/song.js

module.exports = Song;
