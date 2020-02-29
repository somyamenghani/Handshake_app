"use strict";
const mysql = require('mysql');
const { mysqlhost, mysqluser, mysqlpassword, mysqldatabase,mysqlport } = require("../config/dbconfig")

var pool = mysql.createPool({
  connectionLimit: 100,
  host: mysqlhost,
  user: mysqluser,
  port: mysqlport,
  password: mysqlpassword,
  database: mysqldatabase
});

pool.getConnection((err) => {
  if (err) {
      throw 'Error occured: ' + err;
  } else {
      console.log("SQL Connected");
      
  }
});

module.exports = pool;