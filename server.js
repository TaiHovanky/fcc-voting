const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();

// const routes = require('./routes/index');
const schema = require('./schema');
const users = require('./routes/users');
const polls = require('./routes/polls');

const mongoose = require('mongoose');
const db = 'mongodb://localhost/votedb';
mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/polls', polls);
// app.use('/users', users);
// commenting out the below section because i'm going to separate the projects into an API and a UI project
// app.use(express.static(path.join(__dirname, './src/bundle.js')));
// app.use('/graphql', expressGraphQL({
//     schema,
//     graphiql: true,
// }));

app.listen(3000, () => {
    console.log('listening on 3000');
});