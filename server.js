const express = require("express");
const mongoose = require("mongoose");
const users = require('./routes/api/users')
const profiles = require("./routes/api/profiles");
const images = require("./routes/api/images");

const bodyparser = require('body-parser');
const passport = require('passport');
const app = express();

//Body parser middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Db Config
const db = require("./config/keys").mongoURI;
//Connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connected!"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users)
app.use('/api/profiles', profiles);
app.use('/api/images', images);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));