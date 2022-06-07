const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());

app.listen(3001, () => {
    console.log("Server is up and running in port 3001")
});