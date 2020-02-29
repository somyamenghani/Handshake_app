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
    let sql,result;
    msg.route = "profileupdate";
    console.log('request reached update'+JSON.stringify(req.body));

    //console.log(req.files[0]);
    
      sql=`UPDATE Student 
SET 
        Name ='${req.body.userName}',
        CareerObjective = '${req.body.userCareerObj}',
        ContactNumber='${req.body.userContactNumber}',
        CollegeName='${req.body.userCollege}',
        Major='${req.body.userMajor}',
        Degree='${req.body.userDegree}',
        CGPA='${req.body.userCgpa}',
        YOP='${req.body.userYOP}',
        CollegeLocation='${req.body.userCollegeLocation}',
        Skills='${req.body.userSkills}',
        WorkDetails='${req.body.userWorkDetails}',
        City='${req.body.userCity}',
        State='${req.body.userState}',
        Country='${req.body.userCountry}'
WHERE StudentId= ${req.body.userId}`;
      console.log(sql);
    pool.getConnection(function(err,connection){
    connection.query(sql, (err, sqlResult) => {
      connection.release();
      if (err) {
        console.log("reching err");
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
})

module.exports = router;