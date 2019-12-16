const express = require('express');
const router = express.Router()
const routers = require('../routers')



module.exports = (app) => {
    router.get('/vue-todo/*', (req, res) => {
        res.sendFile(__dirname + '/')
    });


    app.use(routers.vue_todo, express.static(__dirname + '/'));
    app.use(router);




}