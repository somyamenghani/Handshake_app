
const app = require("../app");
const express = require("express");
const router = express.Router();
const pool = require('../db/sqlConnection');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');
const multer  = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { awsBucket, awsSecretAccessKey,region, awsAccessKey, awsSessionToken,awsPermission } = require("../config/config")


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
            contactInfo:sqlResult[0].ContactInfo,
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
  aws.config.update({
    secretAccessKey: awsSecretAccessKey,
    accessKeyId: awsAccessKey,
    region:region,
    sessionToken:awsSessionToken
  });
  
  var s3 = new aws.S3();
  
  var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: awsBucket,
        key: function (req, file, cb) {
          console.log("dataaaaa");
            console.log("AWs config" + aws.config);
            console.log(JSON.stringify(req.body));
            console.log(s3);
            console.log(file);
            cb(null, (Date.now() + '-' +file.originalname));//use Date.now() for unique file keys
            console.log("reached file");
        }
    })
  });
  router.post('/upload', upload.single('file'),(req,res) => {
    console.log("data is der");
    let sql;let result;
    try {
      console.log(JSON.stringify(req.body));
      console.log(req.file.location);
    sql=`UPDATE Company 
    SET 
            Image ='${req.file.location}'
    WHERE CompanyId= ${req.body.userId}`;
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
    } 
    catch(err) {
      res.writeHead(500,'Internal server error',{
        'Content-Type' : 'text/plain'
    })
    res.end();
    }
  })
module.exports = router;