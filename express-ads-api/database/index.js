

const DB_POOL = { min: 0, max: 15 };
const knex = require('express')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 8889,
      user : 'root',
      password : 'root',
      database : 'creensight',
      socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
    },
    pool: DB_POOL
  });
  module.exports = { express };
  

  
