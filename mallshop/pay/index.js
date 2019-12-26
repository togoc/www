const express = require('express');
const router = express.Router()
const passport = require("passport")
module.exports = app => {

        router.post('/mallshop/addbuylist', passport.authenticate("jwt", { session: false }), (req, res) => {
            console.log(req.body)
            res.send('value');
        });






        app.use(router);
    }
    // app.get(routers.index, passport.authenticate("jwt", { session: false }), (req, res) => {
    //     console.log(req.user)
    //     res.send('ok');
    // });