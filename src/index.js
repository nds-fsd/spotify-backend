const express = require("express");
const cors = require("cors");

const app = express();
const { connectDB } = require("./mongo");
const { disconnectDB } = require("./mongo");

const albumRouter = require("./controller/albumRouter");
const genreRouter = require("./controller/genreRouter");
const songRouter = require("./controller/songRouter");
const User = require("./controller/userRouter");
const playlistRouter = require("./controller/playlistRouter");
const artistRouter = require("./controller/artistsRouter");
const { authRouter, configSecurity } = require("./controller/authRouter");

const PORT = process.env.PORT || 8080;
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use("/songs", songRouter);
app.use("/", User);
app.use("/", authRouter);
app.use("/", artistRouter);
app.use("/", playlistRouter);
app.use("/", albumRouter);
app.use("/", genreRouter);

if (process.env.NODE_ENV !== "test") {
  connectDB().then(async (error) => {
    if (error) {
      console.log(error);
    }
  });
}

configSecurity(app);

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log(`Server is up and running in port ${PORT}`);
  }
});

module.exports = { app, server };
