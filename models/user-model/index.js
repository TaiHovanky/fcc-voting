const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    polls: [{
        type: Schema.Types.ObjectId,
        ref: 'Poll'
    }],
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);