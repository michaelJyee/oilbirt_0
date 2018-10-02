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

// var q = `CREATE TABLE account(
//             user_id serial PRIMARY KEY,
//             username VARCHAR (50) UNIQUE NOT NULL,
//             password VARCHAR (50) NOT NULL,
//             email VARCHAR (355) UNIQUE NOT NULL,
//             created_on TIMESTAMP NOT NULL,
//             last_login TIMESTAMP
//           );`;


// sequelize.query(q).then(data => {
//   console.log(data);
// })

const account = sequelize.define('account', {
  user_id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  username: {type: Sequelize.STRING},
  password: {type: Sequelize.STRING},
  email: {type: Sequelize.STRING},
  created_on: {type: Sequelize.DATE},
  last_login: {type: Sequelize.DATE}
},{
  timestamps: false,
  tableName: 'account'
});


account.findOrCreate({where: {user_id: 12}, defaults: {username: 'john',password:'yo',email:'yoyoyoy','created_on':'2018-09-11'}})
  .spread((user, created) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
  })
