const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const mongo = require('./mongo');
const songsRouter = require('./routers/songRouter')
const User = require('./routers/controller/authRegister');
const PORT = process.env.PORT;
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))
app.use(express.json())
app.use('/songs', songsRouter);
app.use('/auth', User);

app.listen(PORT, () => {
    console.log('"Server is up and running in port 3001"')
})