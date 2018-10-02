const Sequelize = require('sequelize');
// Or you can simply use a connection uri
const sequelize = new Sequelize('postgres://it_oilbirt:password@localhost:5432/it_oilbirt_dev');

// sequelize
// .authenticate()
// .then(() => {
//   console.log('Connection has been established successfully.');
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err);
// });

// var q = `CREATE TABLE Contacts(
//             id serial PRIMARY KEY UNIQUE,
//             name VARCHAR (255),
//             email VARCHAR (255) UNIQUE,
//             type VARCHAR (255),
//             stage VARCHAR (255),
//             createdAt TIMESTAMP NOT NULL,
//             deletedAt TIMESTAMP
//           );`;

// sequelize.query(q).then(data => {
//   console.log(data);
// })

const Contacts = sequelize.define('Contacts', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: Sequelize.STRING},
  email: {type: Sequelize.STRING},
  type: {type: Sequelize.STRING},
  stage: {type: Sequelize.DATE}
},{
  timestamps: false,
  tableName: 'contacts'
});


Contacts.findAll({}).then(contacts => {
  console.log(contacts);
});
