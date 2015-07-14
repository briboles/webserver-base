var supertest = require('supertest');
var app = require('../server.js');
var User = require('../lib/dbmodels/user');

// Test User Object
var userData = {
  username: "testuser",
  email: "user@testuser.com",
  password: "Sup3rTe5t!",
  name: "Test Userson"
};

describe('User Functions', function() {

  // Remove the test user from mongo database after all tests have run.
  after(function() {
    User.find({ username: userData.username }).remove().exec();
  });

  describe('CreateUser', function() {
    it('Should create a new user', function (done) {
      supertest(app)
        .post('/signup')
        .send(userData)
        .expect(200, { "success": true, "redirectUrl": "/manager" })
        .end(done);
    });
  });

  describe('LoginSuccessful', function() {
    it('Should login successfully', function(done) {
      supertest(app)
        .post('/login')
        .send({ username: userData.username, password: userData.password })
        .expect(200, { "success": true, "redirectUrl": "/manager" })
        .end(done);
    });
  });

  describe('LoginFailed', function() {
    it('Should fail to login', function(done) {
      supertest(app)
        .post('/login')
        .send({ username: userData.username, password: "wrongpass" })
        .expect(401, { "success": false, "error": 'Authentication Failed.'})
        .end(done);
    });
  });

  describe('Logout', function() {
    it('Logs out current user', function(done) {
      supertest(app)
        .get('/logout')
        .expect(302)
        .end(done);
    });
  });

});