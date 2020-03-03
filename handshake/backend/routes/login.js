"use strict"
const app = require("../app");
const express = require("express");
const router = express.Router();
const pool = require('../db/sqlConnection');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

//Route to handle Post Request Call
router.post("/", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "login";
    console.log('request reached'+JSON.stringify(req.body));
    if(req.body.userType==1)
    {
      sql="Select * from Student where EmailId='"+req.body.userEmail+"' and Password= '"+req.body.password+"'";
      console.log(sql);
    }
    else{
      sql="Select * from Company where EmailId='"+req.body.userEmail+"' and Password= '"+req.body.password+"'";
      console.log(sql);
    }
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        res.writeHead(500,'Internal server error',{
          'Content-Type' : 'text/plain'
      })
      res.end("Internal server error");
    }
      else{
        if(sqlResult && sqlResult.length > 0 && sqlResult[0] && req.body.userType==1)
        {
        console.log(sqlResult);
        let result=JSON.stringify(sqlResult);
        console.log(result);
        const payload = {
          emailId: req.body.userEmail,
          userId: JSON.stringify(sqlResult[0].StudentId),
          name: JSON.stringify(sqlResult[0].Name),
          collegeName: JSON.stringify(sqlResult[0].collegeName),
          major: JSON.stringify(sqlResult[0].Major)
      
        };
        const token = jwt.sign(payload,secret, {
          expiresIn: 900000 // in seconds
        });
        let jwtToken = 'JWT ' + token;
        console.log(jwtToken);
        // msg.status = STATUS_CODE.SUCCESS;
        // msg.token = jwtToken;
        //res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.write(jwtToken);
      res.end();
      }
     else if(sqlResult && sqlResult.length > 0 && sqlResult[0] && req.body.userType==='2')
      {
      console.log(sqlResult);
      let result=JSON.stringify(sqlResult);
      console.log(result);
      const payload = {
        emailId: req.body.userEmail,
        userId: JSON.stringify(sqlResult[0].CompanyId),
        name: JSON.stringify(sqlResult[0].Name),
        collegeName: JSON.stringify(sqlResult[0].Location)
      };
      const token = jwt.sign(payload,secret, {
        expiresIn: 900000 // in seconds
      });
      let jwtToken = 'JWT ' + token;
      console.log(jwtToken);
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
    res.write(jwtToken);
    res.end();
    }
      
    else {
      console.log(sqlResult);
        res.writeHead(401,'Invalid User Credentials',{
          'Content-Type' : 'text/plain'
      })
      res.end("Login Failed");

    }
  }
    })
  })
module.exports = router;