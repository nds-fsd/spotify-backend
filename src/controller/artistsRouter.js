const express = require("express");
const Artists = require("../mongo/Schema/Artists/artists");
const artistRouter = express.Router();

artistRouter.get("/artist", async(req,res)=> {
    const allArtists = await Artists.find();
    res.json(allArtists);
});

artistRouter.get("/artist/:id", async(req,res)=> {
    const { id } = req.params;
    if (id !== undefined){
        const artists = await Artists.findById(id);
        if(!artists){
            return res.status(404).send();
        }
        res.json(artists);
    }
    return res.status(404).send();
});

artistRouter.post("/artist", async(req,res)=>{
    const body = req.body;

    const data = {
     name: body.name,
     bio: body.bio,
     monthlyUsers: body.monthlyUsers,
     albums: body.albums
    };

    const newArtist =  new Artists(data);

    await newArtist.save();
    res.json(newArtist);
});

artistRouter.patch("/artist/:id", async (req,res)=>{
    const { id } = req.params ;
    const { body } = req;
    if (id !== undefined){
        const artists = await Artists.findOneAndUpdate({_id: id}, body, {
            new: true,
        });
        if(!artists){
            return res.status(404).send();
        }
        return res.json(artists);
    }
    return res.status(404).send();
});

artistRouter.delete("/artist/:id", async (req, res)=> {
    const { id } = req.params;
    if (id!== undefined){
        const artist = await Artists.findByIdAndRemove(req.params.id, {returnOriginal: true});
    if (!artist){
        return res.status(400).send();
    }
    return res.status(200).send({message: "Artist Deleted"});
}
return res.status(404).send();
});

module.exports = artistRouter;