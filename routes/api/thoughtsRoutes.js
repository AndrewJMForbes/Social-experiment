const router = require('express').Router();
const {
  getSingleThought, 
  getAllThoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/userThoughtController')
router.route('/').get(getAllThoughts).post(createThought)
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)

module.exports = router;