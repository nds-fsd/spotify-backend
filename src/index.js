const express = require("express");
const cors = require("cors");

const {
  authRouter,
  configSecurity,
} = require("./controller/authRouter");

const app = express();
const { connectDB } = require("./mongo");
const { disconnectDB } = require("./mongo");
const songsRouter = require("./controller/songRouter");
const User = require("./controller/userRouter");
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

configSecurity(app);
app.use(express.json());
app.use("/songs", songsRouter);
app.use("/", User);
app.use("/", authRouter);

if (process.env.NODE_ENV !== "test") {
  connectDB().then(async (error) => {
    if (error) {
      console.log(error);
    }
  });
}

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log('"Server is up and running in port 3001"');
  }
});

module.exports = { app, server };
