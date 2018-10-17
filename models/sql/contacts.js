const Sequelize = require('sequelize');
const sequelize = require('../../lib/sql.js');

module.exports = sequelize.define('Contacts', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    type: {type: Sequelize.STRING},
    stage: {type: Sequelize.STRING}
  },
  {
    tableName: 'contacts'
  });