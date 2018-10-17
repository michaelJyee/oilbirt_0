var formidable             = require('formidable');
var csv                    = require('csvtojson')
var Contacts               = require('../models/sql/contacts.js');
var vasync                 = require('vasync');


exports.list = function(req,res){
  Contacts.findAll({})
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


        console.log(jsonObj[0]);

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