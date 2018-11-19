/*jshint esversion: 6 */ 
var Sequelize = require('sequelize');
var Lists = require('../models/sql/lists.js');
var Contacts = require('../models/sql/contacts.js');
var _ = require('lodash');
const Op = Sequelize.Op;

const operators = {
  CONTAINS: Op.iLike,
  NOTCONTAINS: Op.notILike,
  NOTEQ: Op.not
};

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

exports.execute = function(req, res){
  Lists.findOne({where:{id:req.params.id}})
    .then(function(data){
      var q = JSON.parse(data.querymodel);
      _queryModelToObject(q);

      res.send(data);
    })
    .catch(function(err){
      console.log(err);
      res.send(400);
  });
};

function _queryModelToObject(model){
  var where = {};

  model.forEach(function(param){
    if(!where[param.field]) where[param.field] = {};

    if(param.opp === 'NOTCONTAINS' || param.opp === 'NOTCONTAINS'){
      where[param.field][operators[param.opp]] = `%${param.value}%`;
    }
    else if(param.opp === 'EQ'){
      where[param.field] = param.value;
    }
    else if(param.opp === 'NOTEQ'){
       where[param.field][operators[param.opp]] = `${param.value}`;
    }

    console.log(param);
  });

  console.log("where=>",where);
  Contacts.findAll({where:where})
  .then(data => {
    console.log(data);
  });

  return where;
}