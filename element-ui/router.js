const express = require('express');
const passport = require("passport")
const routers = require('../routers')
module.exports = (app) => {
    app.use(routers.elment, express.static(__dirname));
    app.get('/xx', passport.authenticate("jwt", { session: false }), (req, res) => {
        console.log(req.user)
        res.send('ok');
    });
}