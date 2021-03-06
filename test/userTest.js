const app = require('../server')
const User = require('../models/user.model')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

chai.use(chaiHttp)

const agent = chai.request.agent(app)

const user = {
  username: 'Test User',
  password: 'test'
}

describe('Testing Authentication', function(){
  it('should sign up new user', function(done){
      agent
          .post('/users/signup')
          .set("content-type", "application/x-www-form-urlencoded")
          .send(user)
          .end(function(err, res){
              if (err) {
                  done(err)
              }
              expect(res.status).to.be.equal(200)
              expect(res.body).to.be.an('object')
              expect(res.body).to.haveOwnProperty('pictures')
              done()
          })
  })

  it('should logout a user', function(done){
      agent
          .get('/users/logout')
          .end(function(err, res){
              if (err) {
                  done(err)
              }
              expect(res.status).to.be.equal(200)
              expect(res.body).to.be.an('object')
              expect(res.body).to.haveOwnProperty('pictures')
              done()
          })
  })

  it('should login a user', function(done){
      agent
          .post('/users/login')
          .set("content-type", "application/x-www-form-urlencoded")
          .send(user)
          .end(function(err, res){
              if (err) {
                console.log(res.body)
                  done(err)
              }
              expect(res.status).to.be.equal(200)
              expect(res.body).to.be.an('object')
              expect(res.body).to.haveOwnProperty('pictures')
              done()
          })
  })

  after(function(done) {
      agent
          .get('/logout')
          .end(function(err, res){
              if (err) {
                  console.log(err)
              }
              console.log('Logged out')
          })
      User.findOneAndDelete({username: user.username}, (err, user) => {
          if (err) {
              done(err)
          } else {
              done()
          }
      })
  })
})