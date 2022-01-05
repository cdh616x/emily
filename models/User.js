//jshint esversion:6
//mongoose model class

const mongoose = require("mongoose");
const { Schema } = mongoose;// = (const Schema = mongoose.Schema)

const userSchema = new Schema({
  googleID: String,//value will always be a string
  displayName: String,
  email: []
});

mongoose.model("users", userSchema);//will not overwrite existing collections, loads a schema into mongoose
