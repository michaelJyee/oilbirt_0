var mongoose = require('mongoose');

var item = new mongoose.Schema({
  title: String,
  imgUrl: {type:String, required:true},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('item', item);