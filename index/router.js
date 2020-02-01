const express = require('express');
const DB = require('./db')
const router = express.Router()
module.exports = (app) => {
    router.get('/index/demolist', (req, res) => {
        DB.demolist.find({}).then(list => {
            res.status(200).json(list);;
        })
    });
    app.use('/index', express.static(__dirname));
    app.use(router);
}
