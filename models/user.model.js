const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  }
})

userSchema.pre('save', async function(next) {
  const user = this
  if (!user.isModified || !user.isNew) {
    next()
  } else {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      user.password = hashedPassword
      next()
    } catch (err) {
      next(err)
    }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User