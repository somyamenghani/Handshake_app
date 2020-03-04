"use strict"
const app = require("../app");
const express = require("express");
const router = express.Router();
const pool = require('../db/sqlConnection');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

//Route to handle Post Request Call

router.post("/postJobOpening", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "Adding new Job Posting";
    let ts = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    console.log("date of " + ts);
    console.log('request reached'+JSON.stringify(req.body));
    
      
      sql=`INSERT INTO Jobs(CompanyId,jobtitle,postingdate,deadline,city,state,salary,description,jobcategory,companyname) VALUES ('${req.body.companyId}','${req.body.jobtitle}','${ts}', '${req.body.deadline}', '${req.body.city}','${req.body.state}','${req.body.salary}',
      '${req.body.description}','${req.body.jobcategory}','${req.body.companyname}')`
      console.log(sql);
    
   
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        if(err.code === 'ER_DUP_ENTRY')
        {
          res.writeHead(409,'Job posting already exists',{
            'Content-Type' : 'text/plain'
        })
        res.end();
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
        if(sqlResult)
        {
        console.log(sqlResult);
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.end("Successful Job posting has been updated");
      }
  }
    })
  })


  router.post("/getJobsPosted", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "job posted details";
    console.log('request reached'+JSON.stringify(req.body));
   
    
    
      sql=`Select * from Jobs where CompanyId='${req.body.companyId}'`;
      console.log(sql);
    
    
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        res.writeHead(500,'Internal server error',{
          'Content-Type' : 'text/plain'
      })
      res.end("Internal server error");
    }
      else{
        if(sqlResult && sqlResult.length > 0 )
        {
        console.log(sqlResult);
        let result=JSON.stringify(sqlResult);
        console.log(result);
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.end(result);
      }
    else {
      console.log(sqlResult);
        res.writeHead(401,'Company not registered',{
          'Content-Type' : 'text/plain'
      })
      res.end("Company not registered");

    }
  }
    })
  })

//   router.post("/getAllJobsPosted", async (req, res) => {

//     let msg = req.body;
//     let sql;
//     msg.route = "All job posted details";
//     console.log('request reached'+JSON.stringify(req.body));
   
    
    
//       sql=`Select * from Jobs where CompanyId='${req.body.companyId}'`;
//       console.log(sql);
    
    
//     pool.query(sql, (err, sqlResult) => {
//       if (err) {
//         res.writeHead(500,'Internal server error',{
//           'Content-Type' : 'text/plain'
//       })
//       res.end("Internal server error");
//     }
//       else{
//         if(sqlResult && sqlResult.length > 0 )
//         {
//         console.log(sqlResult);
//         let result=JSON.stringify(sqlResult);
//         console.log(result);
//         res.writeHead(200,{
//           'Content-Type' : 'text/plain'
//       })
//       res.end(result);
//       }
//     else {
//       console.log(sqlResult);
//         res.writeHead(401,'Company not registered',{
//           'Content-Type' : 'text/plain'
//       })
//       res.end("Company not registered");

//     }
//   }
//     })
//   })


  router.post("/applyJob", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "Applying Job";
    let ts = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    console.log("date of " + ts);
    let status = "Pending";
    console.log('request reached'+JSON.stringify(req.body));
    {
      
      sql=`INSERT INTO application(studentid,jobid,applicationdate,status) VALUES ('${req.body.studentid}','${req.body.jobid}','${ts}', '${status}')`;
      console.log(sql);
    }
   
    pool.query(sql, (err, sqlResult) => {
      if (err) {
        if(err.code === 'ER_DUP_ENTRY')
        {
          res.writeHead(409,'Job posting already exists',{
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
        if(sqlResult)
        {
        console.log(sqlResult);
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.end("Job application is complete. We will review your application and get back");
      }
  }
    })
  })

  router.post("/getStudentApplied", async (req, res) => {

    let msg = req.body;
    let sql;
    msg.route = "login";
    console.log('request reached'+JSON.stringify(req.body));
    {
      sql="Select s.StudentId,s.Name from application a join Student s where a.jobid='"+req.body.jobid+"' and s.studentId = a.studentid";
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
        if(sqlResult && sqlResult.length > 0 )
        {
        console.log(sqlResult);
        let result=JSON.stringify(sqlResult);
        console.log(result);
        /*
        const payload = {
          emailId: req.body.userEmail,
          userId: JSON.stringify(sqlResult[0].StudentId),
          name: JSON.stringify(sqlResult[0].Name),
          collegeName: JSON.stringify(sqlResult[0].collegeName),
          major: JSON.stringify(sqlResult[0].Major)
      
        };
        */
   
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
      })
      res.end(result);
      }
    else {
      console.log(sqlResult);
        res.writeHead(401,'Company not registered',{
          'Content-Type' : 'text/plain'
      })
      res.end("Company not registered");

    }
  }
    })
  })

  router.post("/updateApplicationStatus", async (req, res) => {

    let msg = req.body;
    let sql,result;
    msg.route = "profileupdate";
    console.log('request reached update'+JSON.stringify(req.body));

    //console.log(req.files[0]);
    
      sql=`UPDATE application 
SET 
        status ='${req.body.status}'
WHERE studentid= ${req.body.studentid} and jobid = ${req.body.jobid} `;
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

router.post("/searchJobs", async (req, res) => {

  let msg = req.body;
  let sql;
  msg.route = "loginaaaaaa";
  console.log('request reached'+JSON.stringify(req.body));
  let searchString = req.body.searchString;
  let category = req.body.category;
  let location = req.body.location;
  sql = "select * from Jobs where (jobtitle like '%" + searchString + "%' or city like '%" + searchString +"%')";
  if (category != null && category.length > 0)
  {
    sql = sql + " and jobcategory = '" + category + "'"
  }
  if (location != null && location.length > 0)
  {
    sql = sql + " and city like '%" + location + "%';";
  }
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
           
//       if(sqlResult && sqlResult.length > 0 )
//       {
//       console.log(sqlResult);
//       let result=JSON.stringify(sqlResult);
//       console.log(result);
//       res.writeHead(200,{
//         'Content-Type' : 'text/plain'
//     })
//     res.end(result);
//     }
//   else {
//     console.log(sqlResult);
//       res.writeHead(401,'[]',{
//         'Content-Type' : 'text/plain'
//     })
//     res.end("[]");
//   }
}
  })
})

router.post("/getJobInfo", async (req, res) => {

  let msg = req.body;
  let sql;
  msg.route = "loginaaaaaa";
  console.log('request reached'+JSON.stringify(req.body));
  let jobid = req.body.jobid;
  
  sql = "select * from handshake_app.Jobs where jobid='" + jobid + "';";
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
      if(sqlResult && sqlResult.length > 0 )
      {
      console.log(sqlResult);
      let result=JSON.stringify(sqlResult);
      console.log(result);
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
    })
    res.end(result);
    }
  else {
    console.log(sqlResult);
      res.writeHead(401,'[]',{
        'Content-Type' : 'text/plain'
    })
    res.end("[]");

  }
}
  })
})


module.exports = router;