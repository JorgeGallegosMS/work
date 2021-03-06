const Picture = require('../models/picture.model')

module.exports = {
  getAllPictures: async (req, res) => {
    try {
      const pictures = await Picture.find()
      res.send({pictures})
    } catch (err) {
      res.status(400).send({error: err.message})
    }
  },
  getOnePicture: async (req, res) => {
    try {
      const picture = await Picture.find({_id: req.params.id})
      res.send({picture})
    } catch (err) {
      res.status(400).send({error: err.message})
    }
  },
  newPicture: async (req, res) => {
    if (!req.user) return res.status(401).send({message: 'You must be logged in to do that'})

    try {
      const created_by = req.user.username
      await Picture.create({...req.body, created_by})
      res.redirect('/pictures')
    } catch (err) {
      res.status(400).send({error: err.message})
    }
  },
  editPicture: async (req, res) => {
    if (!req.user) return res.status(401).send({message: 'You must be logged in to do that'})

    try {
      const picture = await Picture.find({_id: req.params.id})
      if (!req.user.username == picture[0].created_by) return res.status(401).send({message: 'You do not have permission to do that'})

      await Picture.findOneAndUpdate({_id: req.params.id}, {name: req.body.name})
      res.redirect(`/pictures/${req.params.id}`)
    } catch (err) {
      res.status(400).send({error: err.message})
    }
  },
  deletePicture: async (req, res) => {
    try {
      const picture = await Picture.deleteOne({_id: req.params.id})
      res.status(200).send({
        success: true,
        message: `Successfully deleted ${picture.name}`
      })
    } catch (err) {
      res.status(400).send({error: err.message})
    }
  }
}