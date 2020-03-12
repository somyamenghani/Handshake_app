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
  router.post("/searchEvents", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "searchevents";
    console.log('request reached'+JSON.stringify(req.body));
    let searchString = req.body.searchString;
    
    sql = "select * from Events where (EventName like '%" + searchString + "%') ORDER BY Date ASC";
   
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
  router.post("/register", async (req, res) => {

    let msg = req.body;
    let sql;let selectsql;
    msg.route = "Registering for Event";
    console.log(JSON.stringify(req.body));
    let status;
    console.log('request reached'+JSON.stringify(req.body));
    selectsql=`SELECT Major from Student WHERE StudentId=${req.body.studentid}`
    pool.query(selectsql, (err, sqlResult) => {
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
    if(req.body.eligibility==='all'||(req.body.eligibility===sqlResult[0].Major))
    {
      sql=`INSERT INTO EventRegister(studentid,eventid,eligibility) VALUES ('${req.body.studentid}','${req.body.eventid}','${req.body.eligibility}')`;
      console.log(sql);
    pool.query(sql, (err, sqlResult1) => {
      if (err) {
        if(err.code === 'ER_DUP_ENTRY')
        {
          res.writeHead(409,'Already Registered for Event',{
            'Content-Type' : 'text/plain'
        })
        console.log("Already applied for job");
        res.end("Already applied for the job");
      }
      else
      {
        console.log(err);
        res.writeHead(500,'There is issue with request processing. Internal server error',{
          'Content-Type' : 'text/plain'
      })
      res.end("There is issue with request processing. Internal server error");
    }
  }
  else{
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.end(result);
  }
})
    }
    else
    {
      res.writeHead(405,'Registration not allowed',{
        'Content-Type' : 'text/plain'
    })
    res.end(result);
    }
     
  }
})
  })


  router.post("/getRegistered", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "login";
    console.log('request reached'+JSON.stringify(req.body));
    {
      sql="Select e.EventId,e.EventName from Events e join EventRegister er where er.studentid='"+req.body.studentid+"' and e.EventId = er.eventid";
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

  router.post("/getStudentApplied", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "login";
    console.log('request reached'+JSON.stringify(req.body));
    {
      sql="Select s.StudentId,s.Name,e.eventid from EventRegister e join Student s where e.eventid='"+req.body.eventid+"' and s.studentId = e.studentid";
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