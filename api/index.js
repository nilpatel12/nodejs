
const express = require('express');
var cors = require('cors')
const app = express();
var bodyParser = require('body-parser');
const router = require('./Route/index.js');

app.use(cors());
    app.use(express.static('public'));
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/Route/index', router);

//run app
app.listen(4000, () => console.log('HYY nil I AM LIVE ON PORT 4000' ));
