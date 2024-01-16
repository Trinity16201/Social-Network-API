const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteSingleThought,
  updateThought,
  createReaction,
  deleteReaction,
  
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteSingleThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
