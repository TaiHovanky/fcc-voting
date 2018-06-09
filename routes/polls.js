const express = require('express');
const router = express.Router();
const Poll = require('../models/poll-model');

router.get('/allpolls', function (req, res) {
    Poll.find()
        .exec((err, polls) => {
            if (err) {
                res.send('error happened: ', err);
            }
            console.log('poll', polls)
            res.json(polls);
        });
});

module.exports = router;