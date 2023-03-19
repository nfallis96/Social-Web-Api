// required models
const { Thoughts, Users } = require('../models');

// For exporting the following modules
module.exports = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({ 
            path: 'reactions', 
            select: '-__v' })

        .select('-__v')
        .then(ThoughtsData => 
            res.json(ThoughtsData))

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get thoughts by id
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({ 
            path: 'reactions', 
            select: '-__v' })

        .select('-__v')
        .then(ThoughtsData => {
            if(!ThoughtsData) {
                res.status(400).json({ 
                    message: 'No Thoughts Id' });
                return;
            }

            res.json(ThoughtsData)
        })

        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // create thoughts
    createThoughts({ params, body }, res) {
        Thoughts.create(body)
        .then(({ _id }) => {
            return Users.findOneAndUpdate(
                { _id: params.userId},
                { $push: { 
                    thoughts: _id } },
                { new: true });
        })

        .then(ThoughtsData => {
            if(!ThoughtsData) {
                res.status(404).json({ 
                    message: 'No Thoughts Id' });
                return;

            }
            res.json(ThoughtsData)
        })

        .catch(err => res.json(err));
    },

    // update the thoughts

    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { 
            new: true, runValidators: true })

        .populate({ 
            path: 'reactions', 
            select: '-__v' })

        .select('-__v')

        .then(ThoughtsData => {
            if(!ThoughtsData) {
                res.status(404).json({ 
                    message: 'No Thoughts Id' });
                return;
            }

            res.json(ThoughtsData);
        })

        .catch(err => res.json(err));
    },

    // delete the thoughts
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(ThoughtsData => {
            if(!ThoughtsData) {
                res.status(404).json({ 
                    message: 'No Thoughts Id' });
                return;
            }
            res.json(ThoughtsData);
        })

        .catch(err => res.status(400).json(err));
    },

    // create a reaction
    createReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .populate({ 
            path: 'reactions', 
            select: '-__v' })

        .select('-__v')

        .then(ThoughtsData => {
            if(!ThoughtsData) {
                res.status(404).json({ 
                    message: 'No Thoughts Id' });
                return;
            }

            res.json(ThoughtsData);
        })

        .catch(err => res.status(400).json(err))
    },

    // delete a reaction
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { 
                reactionId: params.reactionId } } },
            { new: true }
        ),

        .then(ThoughtsData => {
        if(!ThoughtsData) {res.status(404).json({ 
            message: 'No Thoughts Id' });
                return;
            }

            res.json(ThoughtsData);
        })

         .catch(err => res.status(400).json(err));
    }
};