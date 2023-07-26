
// import express, { json } from './database/index';
// import express, { json } from 'express';
 const express = require('exspress');

const app = express();

app.use(express.json());

app.get('/',function(req, res){s
    res.send('mayal')

});

app.listen('8080', () => {
    console.log('HYY CONNECT')
});


