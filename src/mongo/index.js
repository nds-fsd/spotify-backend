const mongoose = require("mongoose");
const databaseHost = process.env.DATABASE_HOST;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.PASSWORD;
const databasePort = process.env.DATABASE_PORT;

mongoose.connect(
  "mongodb+srv://root:spotify@proyectospotify.y4horu0.mongodb.net/?retryWrites=true&w=majority"
);

// mongoose.connect(
//     `mongodb://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/app?authSource=admin`
//   );

const mongo = mongoose.connection;
mongo.on("error", (error) => console.error(error));
mongo.once("open", () => {
  console.log("connected to database");
});

module.exports = mongo;
