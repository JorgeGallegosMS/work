const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pictureSchema = new Schema({
  name: {
      type: 'String',
      required: true,
  },
  url: {
      type: 'String',
      required: true
  },
  created_by: {
      type: 'String',
      required: true
  }
})
const Picture = mongoose.model('Picture', pictureSchema)
module.exports = Picture