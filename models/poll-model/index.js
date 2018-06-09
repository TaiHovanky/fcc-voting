const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    question: String,
    option1: {
        name: String,
        votes: Number
    },
    option2: {
        name: String,
        votes: Number
    }
});

module.exports = mongoose.model('Poll', PollSchema);