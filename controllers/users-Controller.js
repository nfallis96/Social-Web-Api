// Required Users model
const { Users } = require('../models');

// Export the following module 
module.exports = {
    // setting for Users Controller function
    getAllUsers(req, res) {
        Users.find({})
        .populate({ 
            path: 'thoughts', 
            select: '-__v' })

        .populate({ 
            path: 'friends', 
            select: '-__v' })

        .select('-__v')
    
        .then(UsersData => res.json(UsersData))

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get a user by id 
    getUsersById({ params }, res) {
        Users.findOne({ _id: params.id })

        .populate({ 
            path: 'thoughts', 
            select: '-__v' })

        .populate({ 
            path: 'friends', 
            select: '-__v' })

        .select('-__v')
        .then(UsersData => {
            if(!UsersData) {

                res.status(404).json({ message: 'No User Id' });
                return;
            }
            res.json(UsersData)
        })

        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // creating users function
    createUsers({ body }, res) {
        Users.create(body)

        .then(UsersData => res.json(UsersData))

        .catch(err => res.status(400).json(err));
    },

    // updating users function
    updateUsers({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        
        .then(UsersData => {
            if(!UsersData) {
                res.status(404).json({ message: 'No User Id' });
                return;
            }
            res.json(UsersData);
        })

        .catch(err => res.json(err))
    },

    // deleting users function
    deleteUsers({ params }, res) {
        Users.findOneAndDelete({
             _id: params.id })

        .then(UsersData => {
            if(!UsersData) {
                res.status(404).json({ message: 'No User Id'});
                return;
            }

            res.json(UsersData);
        })

        .catch(err => res.status(400).json(err));
    },

    // adding friend function
    addFriend({ params }, res) {
        Users.findOneAndUpdate(
            { _id: params.id }, { $addToSet: { 
                friends: params.friendId } }, { new: true })

            .then(UsersData => {
                if(!UsersData) {

                    res.status(404).json({ message: 'No User Id' });
                    return;
                }

                res.json(UsersData);
            })

            .catch(err => res.status(400).json(err));
    },

    // deleting a friend function
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({ _id: params.id }, { $pull: { 
            friends: params.friendId } }, { new: true })

        .populate({ 
            path: 'friends', 
            select: '-__v' })

        .then(UsersData => {
            if(!UsersData) {
                res.status(404).json({ message: 'No User Id' });
                return;
            }

            res.json(UsersData);
        })
        
        .catch(err => res.status(400).json(err));
    }
};