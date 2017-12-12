const express = require('express');
const router = express.Router();

router.get('/allpolls', function (req, res) {
    let db = req.db;
    let collection = db.get('polls');
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

module.exports = router;