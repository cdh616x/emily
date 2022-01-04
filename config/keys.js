//jshint esversion:6 - figure out what set of credentials to return

if (process.env.NODE_ENV === "production") {
  //production version - return prod set of keys
  module.exports = require("./prod.js");
} else {//local machine
  //developer version - return dev set of keys
  module.exports = require("./dev.js");
}
