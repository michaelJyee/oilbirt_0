/*jshint esversion: 6 */ 
var formidable             = require('formidable');
var csv                    = require('csvtojson');
var Contacts               = require('../models/sql/contacts.js');
var vasync                 = require('vasync');
var Sequelize              = require('sequelize');
var moment                 = require('moment');

const NO_UPSERT = 'No Upsert';
const FILE_DATE = 'File Date';
const FORCE = 'Force';

exports.list = function(req,res){
  var params = req.query;
  
  var limit = params.limit;
  var pageNumber = (params.pageNumber-1);
  var offset = limit * pageNumber;
  var where = {};

  if(req.query.search){
    var search = `%${req.query.search}%`;
    where = {name:{$ilike:search}};
  }

  if(req.query.filterStage) where.stage = req.query.filterStage;

  Contacts.findAndCountAll({where:where, limit: limit, offset: offset, order: [['createdAt','DESC']]})
  .then(contacts => {
    res.send(contacts);
  })
  .catch(function (err) {
    console.log("models/contacts.js#list",err);
    res.send(500);
  });
};

exports.uploadCSV = function(req,res){
  var conflictHandler = req.query.conflictOption;
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files){
    if(err){
      res.send(500);
    }
    else if(files && files.file){
      file = files.file;
      var fileLastEditedDate = file.lastModifiedDate;

      csv()
      .fromFile(file.path)
      .then((jsonObj) => {
        vasync.forEachParallel({
          'func': function(arg, done){
            var contactObj = {name:arg.name, email:arg.email, type:'salesLoft', stage:arg.stage};

            _upsertContact(contactObj, conflictHandler, fileLastEditedDate, function(err,data){
              done();
            });
          },
          'inputs': jsonObj
          }, function (err, results) {
            res.send(200);
        });
      });
    }
    else{
      res.send(500);
    }
  });
};

exports.destroyContact = function(req,res){
  var contact = req.body.data;
  console.log(contact);
  Contacts.destroy({where:{id:contact.id}})
  .then(data => {
    console.log("deleted=>", contact);
    res.send(200);
  });
};

exports.editContact = function(req,res){
  var contact = req.body.contact;
  Contacts.update(
    {
      name: contact.name,
      email: contact.email,
      stage: contact.stage
    },
    {
      where: {id: contact.id},
      returning: true,
      plain: true
    }
  )
  .then(function(updatedContact){
    var ret = updatedContact[1];
    res.json(ret);
  });
};

// Helper functions

//OverRide All
function _upsertContact(contactUp, conflictHandler, cb){
  var that = this;
  Contacts.findOne({where:{email:contactUp.email}})
  .then((contact) => {
    if(contact){
      contact.update(contactUp).then((results) => {
        cb();
      });
    }
    else{
      Contacts.create(contactUp)
      .then((results) => {
        cb();
      });
    }
  });
}

//OverRide All
function _upsertContact(contactUp, conflictHandler, fileLastEditedDate, cb){
  var that = this;
  Contacts.findOne({where:{email:contactUp.email}})
  .then((contact) => {
    if(contact && conflictHandler !== NO_UPSERT){
      if(conflictHandler === FILE_DATE){
        var contactDate = moment(contact.updatedAt);
        var fileDate = moment(fileLastEditedDate);
        if(fileDate.isBefore(contactDate)){
          contact.update(contactUp).then((results) => {
            cb();
          });
        }
      }
      else{
        contact.update(contactUp).then((results) => {
          cb();
        });
      }
    }
    else if(!contact){
      Contacts.create(contactUp)
      .then((results) => {
        cb();
      });
    }
  });
}
