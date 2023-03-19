// Required Mongoose and moment
const moment = require('moment');

const { Schema, model, Types } = require('mongoose');


// Reactions for Schema
const ReactionSchema = new Schema(
    {
        // setting the custom id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        }
    },
    {
        toJSON: {
            getters: true 
        }
    }
);

// ThoughtsSchema build up
const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true 
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true 
        },
        id: false
    }
);

// get total number of reactions
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thoughts model by using the ThoughtsSchema function
const Thoughts = model('Thoughts', ThoughtsSchema);

// Export Thoughts module
module.exports = Thoughts;