const express = require('express');
const MySongs = require('../mongo/Schema/songs')
const songsRouter = express.Router();
// const { songsList } = require('./dataSongs/songsList')


songsRouter.get('/songs', async(req, res)=> {
    const allSongs = await MySongs.find();
    res.json(allSongs);
});


songsRouter.get('/songs/:id', async(req, res) => {
    const { id } = req.params;
    if(id !== undefined){
    const song = await MySongs.findById( id );
    return res.json(song);
}

    return res.status(404).send();
})





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
    if(id !== undefined){
    const song = await MySongs.findOneAndUpdate({ _id: id }, body, { new: true });
    
    return res.json(song);
    }

    return res.status(404).send(); 
})

songsRouter.delete('/songs/:id', async(req, res) => {
    
    
    const song = await MySongs.findByIdAndRemove( req.params.id );

    return res.status(200).send( {message: "Song Deleted"} );

})

//me elimina el primer elemento de mi bbdd
//preguntar findByIdAndDelete y findOneAndDelete



module.exports = songsRouter;