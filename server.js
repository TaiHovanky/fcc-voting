const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();

const schema = require('./schema');
const Poll = require('./models/poll-model');
const User = require('./models/user-model');

const mongoose = require('mongoose');
const db = 'mongodb://localhost/votedb';
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/allpolls', (req, res) => {
    Poll.find()
        .exec((err, polls) => {
            if (err) {
                res.send('error happened: ', err);
            }
            res.json(polls);
        });
});

app.get('/allusers', (req, res) => {
    User.find()
        .exec((err, users) => {
            if (err) {
                res.send('error happened: ', err);
            }
            res.json(users);
        });
});

app.get('/pollsForUser/:name', (req, res) => {
    User.findOne({ name: req.params.name })
        .populate('polls')
        .exec((err, person) => {
            if (err) {
                res.send('error happened: ', err);
            }
            res.send(person.polls);
        });
});

app.post('/addpoll', (req, res) => {
    const newPoll = new Poll();
    newPoll.question = req.body.question;
    newPoll.option1.name = req.body.option1Name;
    newPoll.option2.name = req.body.option2Name;
    newPoll.postedBy = req.body.postedBy;

    newPoll.save(function(err, poll) {
        if (err) {
            res.send('error', err);
        }
        // update user so that its array has poll created for that user
        User.findOneAndUpdate({
            _id: poll.postedBy
        }, {
            $push: { polls: poll }
        }, {
            upsert: false
        }, function (err, updatedUser) {
            if (err) {
                res.send('error', err);
            }
        });
    });
});

app.post('/adduser', (req, res) => {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save(function(err, user) {
        if (err) {
            res.send('error', err);
        }
        res.send(user);
    });
});

app.put('/poll/:id/:option', (req, res) => {
    const option = `option${req.params.option}.votes`;

    Poll.findOneAndUpdate({
        _id: req.params.id
    }, {
        $inc: { [option]: 1 }
    }, {
        upsert: false
    }, function (err, updatedPoll) {
        if (err) {
            res.send('error', err);
        }
        res.send(updatedPoll);
    })
})
// commenting out the below section because i'm going to separate the projects into an API and a UI project
// app.use(express.static(path.join(__dirname, './src/bundle.js')));
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}));

app.listen(3000, () => {
    console.log('listening on 3000');
});