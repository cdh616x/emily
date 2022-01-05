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
  callbackURL: "/auth/google/callback",//location where the user is redirected after giving user permission
  proxy: true
},//creates a new instance of google passport strategy, passes in hidden values for OAuth
async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleID: profile.id });//looks to see if user ID already exists in database, query returns a promise
      if (existingUser) {
        //user already has record
        return done(null, existingUser);
      }//user does not have record / make a new record
      const user = await new User({ googleID: profile.id, displayName: profile.displayName }).save();//creates new instance of a user, saves it to database
      done(null, user);
  console.log(profile);
}));
