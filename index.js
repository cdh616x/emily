//jshint esversion:6

const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys.js");

const app = express();

passport.use(new GoogleStrategy({//passport knows that it is google without having to explicitly specify the variable
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/auth/google/callback"//location where the user is redirected after giving user permission
}, (accessToken, refreshToken, profile, done) => {
  console.log("Access Token: ", (accessToken));//--------- console log generated when user successfully authenticates with Google, creates new user with a code (save to database)
  console.log("Refresh Token: ", (refreshToken));
  console.log("Profile: ", (profile));//identifying information
}));
//creates a new instance of google passport strategy, passes in hidden values for OAuth

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]//internal list from google of databases that can be accessed inside of the OAuth process
  }));

app.get(
  "/auth/google/callback", passport.authenticate("google"));//user already has a code at this point


const PORT = process.env.PORT || 5000; //heroku designated port OR port 5000 (when on local machine)
app.listen(PORT, () => { //arrow function
  console.log("Server listening on port " + PORT + ".");
});
