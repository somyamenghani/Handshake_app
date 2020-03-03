"use strict"
const app = require("../app");
const express = require("express");
const router = express.Router();
const pool = require('../db/sqlConnection');

//Route to handle Post Request Call
router.post("/", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "events";
    console.log('request reached'+JSON.stringify(req.body));
    if(req.body.userType==2)
    {
      sql=`INSERT INTO Events(CompanyId, EventName, Description,Time,Date,Location,Eligibility,City) VALUES ('${req.body.companyId}', '${req.body.eventName}', '${req.body.description}', '${req.body.time}','${req.body.date}','${req.body.location}','${req.body.eligibility}','${req.body.city}')`
      console.log(sql);
    }
    
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        console.log(err);
        res.writeHead(500,'Internal server error',{
          'Content-Type' : 'text/plain'
      })
      res.end("Internal server error");
    }
  
      else{
        if(sqlResult)
        {
        console.log(sqlResult);
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.end();
      }
  }
    })
  })

  //Route to handle Post Request Call
router.post("/details/", async (req, res) => {

    let msg = req.body;
    let sql;let result;
    msg.route = "events";
    console.log('request reached'+JSON.stringify(req.body));
    if(req.body.userType==2)
    {
      sql=`SELECT * from Events WHERE CompanyId='${req.body.companyId}'`;
      console.log(sql);
    }
    
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        console.log(err);
        res.writeHead(500,'Internal server error',{
          'Content-Type' : 'text/plain'
      })
      res.end("Internal server error");
    }
  
      else{
        if(sqlResult)
        {
        console.log(sqlResult);
        result=JSON.stringify(sqlResult);
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.write(result);
      res.end();
      }
  }
    })
  })
module.exports = router;