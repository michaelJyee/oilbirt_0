var formidable             = require('formidable');
var csv                    = require('csvtojson')
var Contacts               = require('../models/sql/contacts.js');
var vasync                 = require('vasync');


exports.list = function(req,res){
  console.log("req.query=>",req.query);

  var params = req.query;
  
  var limit = params.limit;
  var pageNumber = (params.pageNumber-1);
  var offset = limit * pageNumber;

  Contacts.findAndCountAll({limit: limit, offset: offset, order: [['createdAt','DESC']]})
  .then(contacts => {
    res.send(contacts);
  })
  .catch(function (err) {
    console.log("models/contacts.js#list",err);
    res.send(500);
  })
}

exports.uploadCSV = function(req,res){
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files){
    if(err){
      res.send(500);
    }
    else if(files && files.file){
      file = files.file;
      csv()
      .fromFile(file.path)
      .then((jsonObj) => {
        vasync.parrell
        vasync.forEachParallel({
          'func': function(arg, done){
            Contacts.create({name:arg.name, email:arg.email, type:'salesLoft', stage:'A'})
            .then((results)=>{
              console.log("\n\n\nresults=>",results,"\n\n\n");
              done();
            })

          },
          'inputs': jsonObj
          }, function (err, results) {
            res.send(200);
        });


      })
    }
    else{
      res.send(500);
    }
  });
}



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
    res.send(200);
  });
}