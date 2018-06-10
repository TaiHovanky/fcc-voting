const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();

const schema = require('./schema');
const Poll = require('./models/poll-model');

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

app.post('/addpoll', (req, res) => {
    const newPoll = new Poll();
        newPoll.question = req.body.question;
        newPoll.option1.name = req.body.option1Name;
        newPoll.option2.name = req.body.option2Name;

        newPoll.save(function(err, poll) {
            if (err) {
                res.send('error', err);
            }
            res.send(poll);
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