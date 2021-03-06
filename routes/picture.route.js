const router = require('express').Router()
const pictureController = require('../controllers/picture.controller')

router.get('/', pictureController.getAllPictures)
router.get('/:id', pictureController.getOnePicture)
router.post('/new', pictureController.newPicture)
router.put('/:id', pictureController.editPicture)
router.delete('/:id', pictureController.deletePicture)

module.exports = router