const mongoose = require('mongoose');

const MONGO_URI = require('./userDBconnect');

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'user'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'species' collection
const userSchema = new Schema({
  userID: { type: String, required: true, unique: true},
  // saved: String
  saved: [String]
});

// creats a model for the 'species' collection that will be part of the export
const User = mongoose.model('user', userSchema);

module.exports = {
  User
};
