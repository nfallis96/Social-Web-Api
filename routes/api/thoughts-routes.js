// required express router
const router = require('express').Router();

// convey from thoughts controller
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// api different functions and features
router.route('/')
    .get(getAllThoughts);
router.route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);
router.route('/:userId')
    .post(createThoughts);
router.route('/:thoughtId/reactions')
    .post(createReaction);
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

// export
module.exports = router;