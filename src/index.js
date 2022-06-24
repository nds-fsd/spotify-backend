const express = require('express');
const cors = require('cors');

const { authRouter, configSecurity } = require('../src/controller/authRegister');

const app = express();
const mongo = require('./mongo');
const songsRouter = require('./controller/songRouter')
const User = require('./controller/userRouter');
const PORT = process.env.PORT;
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))

 configSecurity(app);
app.use(express.json());
app.use('/songs', songsRouter);
app.use('/auth', User);
app.use('/', authRouter);

app.listen(PORT, () => {
    console.log('"Server is up and running in port 3001"')
})