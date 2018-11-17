/*jshint esversion: 6 */ 
const Sequelize = require('sequelize');
const sequelize = require('../../lib/sql.js');

module.exports = sequelize.define('lists', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING},
  querymodel: {type: Sequelize.STRING}
},
{
  tableName: 'lists'
});