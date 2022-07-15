const express = require("express");
const cors = require("cors");

const {
  authRouter,
  //configSecurity,
} = require("../src/controller/authRouter");

const app = express();
const { connectDB } = require("./mongo");
const { disconnectDB } = require("./mongo");
const songRouter = require("./controller/songRouter");
const artistRouter = require("./controller/artistsRouter");
const User = require("./controller/userRouter");
const PORT = process.env.PORT || 8080;
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

//configSecurity(app);
app.use(express.json());
app.use("/songs", songRouter);
app.use("/", User);
app.use("/", authRouter);
app.use("/", artistRouter);

if (process.env.NODE_ENV !== "test") {
  connectDB().then(async (error) => {
    if (error) {
      console.log(error);
    }
  });
}

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log('"Server is up and running in port 8080"');
  }
});

module.exports = { app, server };
