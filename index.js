//jshint esversion:6

const express = require("express");

const app = express();

app.get("/", (req, res) => {//route handler
  res.send({ hi: "there"});
});



const PORT = process.env.PORT || 5000;//heroku designated port OR port 5000 (when on local machine)
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + ".");
});
