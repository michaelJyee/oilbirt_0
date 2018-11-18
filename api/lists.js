var Lists = require('../models/sql/lists.js');

exports.newLists = function(req, res){
  Lists.create({name:req.body.name, querymodel: "[]"})
  .then(function(list){
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

exports.updateList = function(req, res){
  try{
    var queryData = JSON.stringify(req.body.list.querymodel);
    Lists.update(
      {querymodel:queryData},
      {where:{id:req.body.list.id}})
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log("failed to update",err);
      res.send(400);
    });
  }
  catch(err){
    console.log("Error failed to parse", err);
    res.send(400);
  }
};