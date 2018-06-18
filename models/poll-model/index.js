const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    question: String,
    option1: {
        name: String,
        votes: {
            type: Number,
            default: 0
        }
    },
    option2: {
        name: String,
        votes: {
            type: Number,
            default: 0
        }
    },
    postedBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
});

module.exports = mongoose.model('Poll', PollSchema);