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
    const { id } = req.params;
    const { body } = req;
    const song = await MySongs.findOneAndUpdate({ _id: id }, body, { new: true });

   res.json(song);
})



module.exports = songsRouter;