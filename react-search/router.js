const express = require('express');
const router = express.Router()
const RMD = require('../utils/md/index')
module.exports = (app) => {
    router.get('/md', (req, res) => {
        res.send(RMD('./react-search/test.md'));
    });

    app.use('/api', router);
}


