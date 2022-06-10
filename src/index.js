const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
const mongo = require('./mongo');
const songsRouter = require('./routers/music')
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))

app.use(express.json());
app.use(songsRouter);

app.listen(3001, () => {
    console.log('"Server is up and running in port 3001"')
})