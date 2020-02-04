const express = require('express');
const fs = require('fs')
const request = require('request')
const DB = require('./db')
const router = express.Router()
module.exports = (app) => {
    router.get('/demolist', (req, res) => {
        DB.demolist.find({}).then(list => {
            res.status(200).json(list);;
        })
    });

    router.get('/chart', (req, res) => {
        console.log(__dirname)
        let data = fs.readFileSync('./utils/dev/dev.txt', 'utf8')
        res.send(data);
    });

    app.use('/index', express.static(__dirname));
    app.use('/api/index', router);
}
