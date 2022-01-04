//jshint esversion:6

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js");

const User = mongoose.model("users");//model class

passport.serializeUser((user, done) => {
  done(null, user.id);//callback to be called after nudging passport along, tells passport a process has completed, user.id is NOT the profile id - is a bit of mongo data
});

passport.deserializeUser((id, done) => {//deals with cookies
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({//passport knows that it is google without having to explicitly specify the variable
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/auth/google/callback"//location where the user is redirected after giving user permission
},//creates a new instance of google passport strategy, passes in hidden values for OAuth
(accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id })//looks to see if user ID already exists in database, query returns a promise
    .then((existingUser) => {//this is a PROMISE
      if (existingUser) {
        //user already has record
        done(null, existingUser);
      } else {
        //user does not have record / make a new record
        new User({ googleID: profile.id, displayName: profile.displayName })//initial new user (data is transported to database with .save())
          .save()//creates new instance of a user, saves it to database
          .then(user => done(null, user));//fetches better version of user from the database
      }
    });
  console.log(profile);
}));
