// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//       host : 'localhost',
//       port : 8889,
//       user : 'root',
//       password : 'root',
//       database : 'creensight',
//       socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
//     }
//   });
  

  // let userInformation = await ujash();
  // console.log("ujash 14", userInformation);
  // async function ujash(){
  //   return knex.from('users_info').select('*').then((rows) = async => {
  //     return rows;
  //   }).catch((err) => { console.log( err); throw err })
  //   .finally(() => {
  //       knex.destroy();
  //   });
  // }

  // knex.from('users_info').select('*').then((rows) => {
  //   console.log("mayal 15", rows);     
  // }).catch((err) => { console.log( err); throw err })
  // .finally(() => {
  //     knex.destroy();
  // });

  
//   try {
//     const users = await db.query(connection, 'SELECT * FROM users_info');
// } catch (e) {
//     // handle exception
// } finally {
//     await db.close(connection);
//     console.log("mayal savaj")
// }

// var mysql = require('mysql');
// const util = require('util');

// const conn = mysql.createConnection({
//   host : 'localhost',
//   port : 8889,
//   user : 'root',
//   password : 'root',
//   database : 'creensight',
//   socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
// });

// const query = util.promisify(conn.query).bind(conn);

// let result = async function() {
//     var userCourse = [];
//     try {
//         const rows = await query('select * as count from users_info');
//     } finally {
//         conn.end();
//         return userCourse;
//     }
// };


