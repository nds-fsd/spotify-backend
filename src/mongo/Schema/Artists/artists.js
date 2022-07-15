const {Schema, model} = require('mongoose');

const ArtistSchema = new Schema ({
    name: {type: String, required: true },
    bio: {type: String, required: true},
    monthlyUsers: {type: Number, required: true},
    albums: []
});

const Artist = model("artist", ArtistSchema);

module.exports = Artist;