const {Schema, model} = require('mongoose');

const artistsSchema = new Schema ({
    name: {type: String, required: true },
    bio: {type: String, required: true},
    monthlyUsers: {type: Number, required: true},
    albums: []
});

const Artists = model("artists", artistsSchema);

module.exports = Artists;