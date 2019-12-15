const express = require('express');
const passport = require("passport")
const router = express.Router()
const history = require('connect-history-api-fallback');
module.exports = app => {

    app.use('/vue-pro', history());
    app.use("/vue-pro", express.static(__dirname))


    app.use(passport.initialize())
    require("./parts/passport")(passport)



    app.use("/vuepro/users", require("./parts/router/user"))
    app.use("/vuepro/profiles", require("./parts/router/profile"))


    // app.use('/vue-pro', express.static(__dirname));
    app.use(router);
}