//for production keys

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,// ----- shared with the public: identifies app to google servers
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,//----- do not share with anyone
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY
};
