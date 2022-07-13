const { Schema, model } = require("mongoose");
const Artists = require("../Artists/artists");


const songsSchema = new Schema({
  title: { 
    type: String, required: true },
  duration: { 
    type: Number, required: true },
  genre: { 
    type: String, required: true },
  releaseDate: { 
    type: Date, required: true },
  photo: { 
    type: String, required: true },
  artists: { 
    type: Schema.Types.ObjectId,
   ref: "artists", //required: true 
}
});

const Song = model("song", songsSchema);

module.exports = Song;

