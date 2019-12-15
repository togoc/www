const express = require('express');
const router = express.Router()



module.exports = (app) => {
    router.get('/vue-todo/*', (req, res) => {
        res.sendFile(__dirname + '/')
    });


    // app.use(history());
    app.use('/vue-todo', express.static(__dirname + '/'));
    app.use(router);




}