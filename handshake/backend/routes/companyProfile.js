
const app = require("../app");
const express = require("express");
const router = express.Router();
const pool = require('../db/sqlConnection');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
// const FormData = require('form-data');
// const axios = require('axios');

//Route to handle Post Request Call
router.post("/", async (req, res) => {

    let msg = req.body;
    let sql,result;
    msg.route = "companyprofile";
    console.log('request reached'+JSON.stringify(req.body));
      sql=`Select * from Company where CompanyId= ${req.body.userId}`;
      console.log(sql);
    
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        res.writeHead(500,'Internal server error',{
          'Content-Type' : 'text/plain'
      })
      res.end("Internal server error");
    }
      else{
        if(sqlResult && sqlResult.length > 0 && sqlResult[0])
        {
        console.log(sqlResult);
        const payload = {
            userId: req.body.userId,
            emailId:sqlResult[0].EmailId,
            name: sqlResult[0].Name,
            location: sqlResult[0].Location,
            description:sqlResult[0].Description,
            contactInfo:sqlResult[0].ContactInfo
        };
         result=JSON.stringify(payload);
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.write(result);
      res.end();
      }
  }
    })
  })

  router.post("/update", async (req, res) => {

    let msg = req.body;
    let sql,result;
    msg.route = "updatecompanyprofile";
    console.log('request reached'+JSON.stringify(req.body));
    sql=`UPDATE Company 
    SET 
            Name ='${req.body.companyName}',
            Description='${req.body.description}',
            Location='${req.body.location}',
            ContactInfo='${req.body.contactInfo}'
    WHERE CompanyId= '${req.body.companyId}'`;
      console.log(sql);
    
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        res.writeHead(500,'Internal server error',{
          'Content-Type' : 'text/plain'
      })
      res.end("Internal server error");
    }
    else{
      const payload = {
          successFlag:true
      };
       result=JSON.stringify(payload);
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
    res.write(result);
    res.end();
      }
  
    })
  })
module.exports = router;