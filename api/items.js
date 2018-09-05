var Item     = require('../models/item.js');
var User     = require('../models/user.js');

exports.list = function(req,res){
  var pagination = {
    skip: (parseInt(req.query.pageNumber)-1)*parseInt(req.query.pageSize) || 0,
    limit: parseInt(req.query.pageSize)||5,
    sort:{
      updatedAt: -1 //Sort by Date Added DESC
    }
  };

  if(!req.isAuthenticated() && req.query.pageNumber > 2){
    res.status(401).send();
  }
  else if(!req.isAuthenticated()){
    Item.find({},{},pagination)
    .populate({ path: 'owner', select: 'username name -_id' })
    .exec(function(err,items){
      if(err) res.sendStatus(500);
      else res.json(items);
    });
  }
  else{
    Item.find({},{},pagination)
    .populate({ path: 'owner', select: 'username name -_id' })
    .exec(function(err,items){
      if(err) res.sendStatus(500);
      else res.json(items);
    });
  }
}

exports.create = function(req,res){
  var params = {
    userId: req.user._id,
    title: req.body.title,
    url: req.body.url
  }

  User.findOne({'_id':params.userId}, function(err,user){
    var user = req.user;
    if(err){
      res.send(404);
      console.log(err);
    }
    else{
      Item.create({'title':params.title,'imgUrl':params.url,'owner':user._id}, function(err,item){
        if(err){
          console.log(err);
          res.send(500);
        }
        else{
          user.items.push(item);
          user.save();
          res.send(200);
        }
      });
    }
  });
};

exports.destroy = function(req,res){
  var user = req.user;
  var id = req.params.id;
}

