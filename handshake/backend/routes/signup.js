"use strict"
const app = require("../app");
const express = require("express");
const router = express.Router();
const pool = require('../db/sqlConnection');

//Route to handle Post Request Call
router.post("/", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "signup";
    console.log('request reached'+JSON.stringify(req.body));
    if(req.body.userType==1)
    {
      sql=`INSERT INTO Student(Name, EmailId, Password,CollegeName,Major) VALUES ('${req.body.name}', '${req.body.userEmail}', '${req.body.password}', '${req.body.collegeName}','${req.body.major}')`
      console.log(sql);
    }
    else{
        sql=`INSERT INTO Company(Name, EmailId, Password, Location) VALUES ('${req.body.name}',' ${req.body.userEmail}', '${req.body.password}','${req.body.location}')`
    }
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        if(err.code === 'ER_DUP_ENTRY')
        {
          res.writeHead(409,'User Email Id already exists',{
            'Content-Type' : 'text/plain'
        })
        res.end("Signup Failed");
      }
      else
      {
        console.log(err);
        res.writeHead(500,'Internal server error',{
          'Content-Type' : 'text/plain'
      })
      res.end("Internal server error");
    }
  }
      else{
        if(sqlResult)
        {
        console.log(sqlResult);
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.end("Successful Signup");
      }
  }
    })
  })
module.exports = router;