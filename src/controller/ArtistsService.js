const { Artists } = require("../mongo/Schema/Artists/artists");
const { User } = require("../mongo/Schema/User/User");

const create = async (document) => {
    return await new Artists(document).save();
};

const read = async(id)=> {
    return await Artists.findById(id);
};

const findOne = async(query) => {
    return await Artists.find(query);
}

const remove = async(id) =>{
    const result = await Artists.findByIdAndRemove(id);
    return results !== null;
};

module.exports = {
    create,
    read,
    findOne,
    remove
}