var mysql = require('mysql');
require ("dotenv").config();


var con = mysql.createConnection({
  host: process.env.DB_URL || "localhost",
  database: "database",
  user: "Bob",
  password: process.env.DB_PWD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function runQuery(query, args) {
  return new Promise((resolve, reject) => {
    if (args) {
      con.query(query, args, (err, result, fields) => {
        return err ? reject(err) : resolve({
          result: result,
          fields: fields
        });
      })
    } else {
      con.query(query, (err, result, fields) => {
        return err ? reject(err) : resolve({
          result: result,
          fields: fields
        });
      })
    }
  })
}

module.exports = {
  db: con,
  runQuery: runQuery
};