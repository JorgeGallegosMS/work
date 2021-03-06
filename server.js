const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
  if (typeof req.cookies.apiToken === "undefined" || req.cookies.apiToken === null) {
      req.user = null
  } else {
      const token = req.cookies.apiToken
      const decodedToken = jwt.decode(token, { complete: true }) || {}
      req.user = decodedToken.payload
  }
  next()
}

require('./db')

const { port } = require('./vars')

const pictureRoutes = require('./routes/picture.route')
const userRoutes = require('./routes/user.route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cookieParser())

app.use(checkAuth)

// Routes
app.use('/pictures', pictureRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.redirect('/pictures')
})

app.listen(port, () => console.log(`Server started at http://localhost:${port}`))

module.exports = app