const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Db Config
const db = require('./config/keys').mongoURI;
//connect to mongoDb
mongoose
 .connect(db)
 .then(() => console.log('MongoDb Connected..'))
 .catch((err) => console.log(err));

//First Route
app.get('/', (req,res) => res.send("Pls use /api/user or /api/profile or /api/postImages"));

const port = 5000;
app.listen(port , () => console.log(`Server running on ${port}`) );