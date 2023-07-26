const express = require('express');
const router = express.Router();
const dbRouter = require('./db');

router.use('./db',dbRouter);

module.exports =router;
