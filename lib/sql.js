const Sequelize = require('sequelize');
// Or you can simply use a connection uri
const sql = new Sequelize('postgres://it_oilbirt:password@localhost:5432/it_oilbirt_dev');
module.exports = sql;



// const Contacts = require('../models/sql/contacts.js');

// Contacts.findAll({}).then(contacts => {
//   console.log(contacts);
// });
