var supertest = require('supertest');
var app = require('../server.js');

describe('Routing', function() {

  describe('Home Page', function() {
    it('Should respond with 200', function (done) {
      supertest(app)
        .get('/')
        .expect(200,done);
    });
  });

  describe('Signup Page', function() {
    it('Should respond with 200', function (done) {
      supertest(app)
        .get('/signup')
        .expect(200,done);
    });
  });

  describe('Login Page', function() {
    it('Should respond with 200', function (done) {
      supertest(app)
        .get('/login')
        .expect(200,done);
    });
  });
});