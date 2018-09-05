var mongoose               = require('mongoose');
var passportLocalMongoose  = require('passport-local-mongoose');

var UserScheme = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  items: [
    {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'item' }
    ]
});

UserScheme.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserScheme);