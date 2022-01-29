var mysql = require('mysql');
require ("dotenv").config();


var con = mysql.createConnection({
  host: "munir.enteentelos.com",
  database: "database",
  user: "Bob",
  password: process.env.DB_PWD
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports.db = con;