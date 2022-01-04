//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");//requires cookies
const passport = require("passport");//instructs passport to make use of them
const keys = require("./config/keys.js");
require("./models/User.js");
require("./services/passport.js");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,//cookie will last thirty days, this is converted into milliseconds in the expression
    keys: [keys.cookieKey]
  })
);

app.use(
  passport.initialize()
);

app.use(
  passport.session()
);

require("./routes/authRoutes.js")(app);

const PORT = process.env.PORT || 5000; //heroku designated port OR port 5000 (when on local machine)
app.listen(PORT, () => { //arrow function
  console.log("Server listening on port " + PORT + ".");
});
