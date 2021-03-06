const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { jwtSecret } = require('../vars')

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = []
      const result = await User.find()
      result.forEach(user => {
        const { username, _id } = user
        users.push({ username, _id })
      })
      res.send(users)
    } catch (err) {
      res.status(400).send({err: err.message})
    }
  },
  signup: async (req, res) => {
    if (req.user) return res.status(400).send({message: `You are already logged in as ${req.user.username}. Please log out to create a new account`}) 
    try {
      const user =  await User.create(req.body)

      const payload = { username: user.username }
      const secret = jwtSecret
      const options = { expiresIn: '1d' }
      const token = jwt.sign(payload, secret, options)
      res.cookie('apiToken', token, { maxAge: 900000, httpOnly: true })
      res.redirect('/pictures')
    } catch (err) {
      res.status(400).send({err: err.message})
    }
  },
  login: async (req, res) => {
    try {
      if (req.user) return res.status(400).send({message: 'You are already logged in'})

      const username = req.body.username
      const password = req.body.password
      const user = await User.findOne({username})
      const match = await bcrypt.compare(password, user.password)
      if (!match) return res.status(401).send({message: 'Could not log in using those credentials'})
      
      const payload = { username: user.username };
      const secret = process.env.SECRET;
      const options = { expiresIn: '1d' };
      const token = jwt.sign(payload, secret, options);
      res.cookie('apiToken', token, { maxAge: 900000, httpOnly: true })
      res.redirect('/pictures')

    } catch (err) {
      res.status(400).send({err: err.message})
    }
  },
  logout: (req, res) => {
    if (!req.user) return res.status(401).send({message: 'You must be logged in to do that'})

    res.clearCookie('apiToken')
    res.redirect('/')
  }
}