const express = require('express');
const DB = require('./db')
const router = express.Router()
module.exports = (app) => {
    router.get('/demolist', (req, res) => {
        DB.demolist.find({}).then(list => {
            res.status(200).json(list);;
        })
    });

    app.use(router);
}


