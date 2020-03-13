var assert = require('assert');
const app = require('./index');
const request = require('supertest');
var assert = require('chai').assert;

//Login API
it('Test case 1 - should respond with success flag on', function(done) {
    request(app)
      .post('/login')
      .send({"userEmail":"donald@nyu.edu",
        "password":"admin",
    "userType":"1"})
      .expect(200)
      .expect('Content-Type',"text/plain")
      .end(function(err, res) {
            if (err) done(err);
            done();
      });
 });
 //Login failing scenario deliberately passing incorrect credentials to get error status code
 it('Test case 2 - should respond with success flag on', function(done) {
    request(app)
      .post('/login')
      .send({"userEmail":"donald@nyu.edu",
        "password":"admin1",
    "userType":"1"})
      .expect(401)
      .expect('Content-Type',"text/plain")
      .end(function(err, res) {
            if (err) done(err);
            done();
      });
 });
 
 //Failure sign up response
 it('Test case 3 - should respond with success flag on', function(done) {
    request(app)
      .post('/signup')
      .send({"userEmail":"somya@sjsu.edu",
                "password":"admin",
                "userType":"1",
                "name":"Somya",
                "major":"Software Engineering",
                "collegeName":"San Jose State University"})
      .expect(409)
      .expect('Content-Type',"text/plain")
      .end(function(err, res) {
            if (err) done(err);
            done();
      });
 });
 //Success student search response
 it('Test case 4 - should respond with success flag on', function(done) {
    request(app)
      .post('/profile/searchStudents')
      .send({"searchString":"somya"})
      .expect(200)
      .expect('Content-Type',"text/plain")
      .end(function(err, res) {
            if (err) done(err);
            done();
      });
 });
 //Login failing scenario deliberately passing incorrect credentials to get error status code
 it('Test case 5 - should respond with success flag on', function(done) {
    request(app)
      .post('/login')
      .send({"userEmail":"donald@nyu.edu",
        "password":"admin1",
    "userType":"2"})
      .expect(401)
      .expect('Content-Type',"text/plain")
      .end(function(err, res) {
            if (err) done(err);
            done();
      });
 });


 


    