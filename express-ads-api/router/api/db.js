



const express = require('express');
const router = express.Router();
const db = require('../../database/index');

router.get('/',function(req, res) {
db.select().from('db').then(function(data)
{
    res.send(data);
});
});

module.exports = router;