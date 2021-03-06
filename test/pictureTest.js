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

const picture = {
    name: 'Testing Space',
    url: 'https://media.wired.com/photos/5a593a7ff11e325008172bc2/master/w_2560%2Cc_limit/pulsar-831502910.jpg'
}

const editedPicture = {
    name: 'Testing Space Edited',
    url: 'https://media.wired.com/photos/5a593a7ff11e325008172bc2/master/w_2560%2Cc_limit/pulsar-831502910.jpg'
}

let newPic;

describe('Testing API routes', function(){
    before(function(done){
        agent
            .post('/users/signup')
            .set("content-type", "application/x-www-form-urlencoded")
            .send(user)
            .end(function(err, res){
                if (err){
                    done(err)
                }
                done()
            })
    })

    it('should get all pics', function(done){
        agent
            .get('/')
            .end(function(err, res){
                if (err){
                    done(err)
                }
                expect(res.status).to.be.equal(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.haveOwnProperty('pictures')
                done()
            })      
    })

    it('should create a new picture', function(done){
        agent
            .post('/pictures/new')
            .set("content-type", "application/x-www-form-urlencoded")
            .send({
                name: 'Testing Space',
                url: 'https://media.wired.com/photos/5a593a7ff11e325008172bc2/master/w_2560%2Cc_limit/pulsar-831502910.jpg'
            })
            .end(function(err, res){
                if(err) {
                    done(err)
                }
                newPic = res.body.pictures[0]

                expect(res.status).to.be.equal(200)
                expect(newPic.name).to.be.equal(picture.name)
                expect(newPic.url).to.be.equal(picture.url)
                expect(newPic.created_by).to.be.equal(user.username)
                done()
            })
    })

    it('should get a single picture', function(done){
        agent
            .get(`/pictures/${newPic._id}`)
            .end(function(err, res){
                if (err) {
                    done(err)
                }
                const picture = res.body.picture[0]

                expect(res.status).to.be.equal(200)
                expect(picture).to.be.an('object')
                expect(picture._id).to.be.equal(newPic._id)
                done()
            })
    })

    it('should edit a single picture', function(done){
        agent
            .put(`/pictures/${newPic._id}`)
            .set("content-type", "application/x-www-form-urlencoded")
            .send({name: 'Testing Space Edited'})
            .end(function(err, res){
                if (err){
                    done(err)
                }
                const editedPic = res.body.picture[0]
                
                expect(res.status).to.be.equal(200)
                expect(editedPic.name).to.be.equal(editedPicture.name)
                expect(editedPic.url).to.be.equal(editedPicture.url)
                expect(editedPic.created_by).to.be.equal(user.username)
                done()
            })
    })

    it('should delete a picture', function(done){
        agent
            .delete(`/pictures/${newPic._id}`)
            .end(function(err, res){
                if (err){
                    done(err)
                }
                expect(res.status).to.be.equal(200)
                done()
            })
    })
    
    after(function(done) {
        agent
            .get('/logout')
            .end(function(err, res){
                if (err) {
                    done(err)
                }
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