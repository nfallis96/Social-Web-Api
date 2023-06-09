// require express router
const router = require('express').Router();

// Const function for importing from users controller
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/users-controller');

// routes for users and different features 
router.route('/')
    .get(getAllUsers)
    .post(createUsers);
router.route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;