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
    msg.route = "profile";
    console.log('request reached'+JSON.stringify(req.body));
      sql=`Select * from Student where StudentId= ${req.body.userId}`;
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
            collegeName: sqlResult[0].CollegeName,
            major: sqlResult[0].Major,
            contactNumber: sqlResult[0].ContactNumber,
            careerObj:sqlResult[0].CareerObjective,
            degree:sqlResult[0].Degree,
            cgpa:sqlResult[0].CGPA,
            yop:sqlResult[0].YOP,
            collegeLocation:sqlResult[0].CollegeLocation,
            dob:sqlResult[0].DOB,
            city:sqlResult[0].City,
            state:sqlResult[0].State,
            country:sqlResult[0].Country,
            skills:sqlResult[0].Skills,
            workDetails:sqlResult[0].WorkDetails,
            image:sqlResult[0].Image
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

  router.post("/searchStudents", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "search students";
    console.log('request reached'+JSON.stringify(req.body));
    let searchString = req.body.searchString;
    
    sql = "select StudentId,EmailId,Name,CollegeName,Skills from Student where (Name like '%" + searchString + "%' or CollegeName like '%" + searchString +"%' or Skills like '%" + searchString +"%')";
    
    console.log(sql);
  
    
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        console.log(err);
        res.writeHead(500,'Internal server error',{
          'Content-Type' : 'text/plain'
      })
      res.end("Internal server error");
    }
      else{
          console.log(sqlResult);
              let result=JSON.stringify(sqlResult);
               console.log(result);
              res.writeHead(200,{
               'Content-Type' : 'text/plain'
            })
             res.end(result);
  }
    })
  })
module.exports = router;