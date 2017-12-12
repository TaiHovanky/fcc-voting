const express = require('express');
const router = express.Router();

router.get('/userlist', function (req, res) {
    let db = req.db;
    let collection = db.get('users');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

module.exports = router;