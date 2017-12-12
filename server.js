const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

const express = require('express');
const app = express();

// const routes = require('./routes/index');
const users = require('./routes/users');
const polls = require('./routes/polls');

const mongo = require('mongodb');
const monk = require('monk');
var db = monk('localhost:27017/votedb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    req.db = db;
    next();
});

// app.use(require('webpack-dev-middleware') (compiler, {
    //     noInfo: true,
    //     publicPath: config.output.publicPath
    // })) <- 12/7 not sure if needed
app.use('/polls', polls);
app.use('/users', users);
app.use(express.static(path.join(__dirname, './src')));
    
app.listen(3000, () => {
    console.log('listening on 3000');
});