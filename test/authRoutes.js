var supertest = require('supertest');
var app = require('../server.js');
var User = require(global.lib_path+'/dbmodels/user');

// Test User Object
var userData = {
  username: "testuser",
  email: "user@testuser.com",
  password: "Sup3rTe5t!",
  name: "Test Userson"
};

describe('Routing With Auth', function() {

  var agent = supertest.agent(app);

  // Create a new user, login and save cookies to agent.
  before('SetupLoginUser', function(done) {
    var newUser = new User(userData);
    newUser.password = newUser.generateHash(userData.password);
    newUser.save(function (err, newUser) {
      if (err) throw err;
      agent
        .post('/login')
        .send({ username: userData.username, password: userData.password })
        .expect(200, done);
    });
  });

  // Remove the test user from mongo database after all tests have run.
  after(function() {
    User.find({ username: userData.username }).remove().exec();
  });

  /*

  Edit for specific app routes. 

  describe('Manager Page with Active cookie', function() {
    it('Should respond with 200', function(done) {
      agent
        .get('/manager')
        .expect(200, done);
    });
  });

  describe('Manager Page with No cookie', function() {
    it('Should respond with 302', function(done) {
      supertest(app)
       .get('/manager')
       .expect(302, done);
    });
  });
  */
});