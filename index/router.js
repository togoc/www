const express = require('express');
const fs = require('fs')
const path = require('path')
const DB = require('./db')
const router = express.Router()
module.exports = (app) => {
    router.get('/demolist', (req, res) => {
        DB.demolist.find({}).then(list => {
            res.status(200).json(list);;
        })
    });
    console.log(path.resolve('./utils/dev/dev.txt'))
    console.log(path.resolve('utils/dev/dev.txt'))
    router.get('/chart', (req, res) => {
        let data = fs.readFileSync(path.resolve('./utils/dev/dev.txt'), 'utf8')
        res.send(data);
    });

    app.use('/index', express.static(__dirname));
    app.use('/api/index', router);
}
