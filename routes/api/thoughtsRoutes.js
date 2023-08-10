const router = require('express').Router();
const {
  getOneThought, 
  getAllthoughts,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} =require('../../controllers/userThoughtController');

router.route('/').get(getAllthoughts).post(createThought)
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)

module.exports = router;