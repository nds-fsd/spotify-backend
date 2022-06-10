const express = require('express');
const MySongs = require('../mongo/Schema/songs')
const songsRouter = express.Router();
// const { songsList } = require('./dataSongs/songsList')


songsRouter.get('/songs', async(req, res)=> {
    const allSongs = await MySongs.find();
    res.json(allSongs);
});



songsRouter.post('/songs', async(req, res) => {
    const body = req.body;

    const data = {
        title: body.title,
        duration: body.duration,
        genre: body.genre,
        releaseDate: body.releaseDate
    }

    const newSong = MySongs(data);

    await newSong.save();

    res.json(newSong);
});


songsRouter.patch('/songs/:id', async(req, res) => {
    const song = await MySongs.findByIdAndUpdate(req.params.id, req.body);

   res.json(song);
})



module.exports = songsRouter;