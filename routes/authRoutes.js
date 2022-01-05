//jshint esversion:6

const passport = require("passport");
module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]//internal list from google of databases that can be accessed inside of the OAuth process
    }));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get(
    "/auth/google/callback", passport.authenticate("google"));//user already has a code at this point

  // app.get("/", (req, res) => {
  //   res.sendFile("../client/build/static");
  // });

  app.get("/api/current_user", (req, res) => {
    res.send("Here is your information: " + req.user);
  });
};
