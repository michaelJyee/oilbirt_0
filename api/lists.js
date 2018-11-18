var Lists = require('../models/sql/lists.js');

exports.newLists = function(req, res){
  Lists.create({name:req.body.name})
  .then(function(list){
    console.log("list=>",list);
    res.send(list);
  })
  .catch(function(err){
    res.send(400);
  });
};

exports.getLists = function(req, res){
  Lists.findAndCountAll({})
  .then(function(data){
    res.send(data);
  })
  .catch(function(err){
    res.send(400);
  });
};

exports.getList = function(req, res){
  Lists.findOne({where:{id:req.params.id}})
  .then(function(data){
    res.send(data);
  })
  .catch(function(err){
    res.send(400);
  });
};