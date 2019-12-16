const express = require('express');
const passport = require("passport")
const router = express.Router()
const history = require('connect-history-api-fallback');
const routers = require('../routers')
module.exports = app => {

    app.use(routers.vue_pro, history());
    app.use(routers.vue_pro, express.static(__dirname))


    app.use(passport.initialize())
    require("./parts/passport")(passport)


    // "/vuepro/users"
    app.use(routers.vue_pro_users, require("./parts/router/user"))

    // "/vuepro/profiles"
    app.use(routers.vue_pro_profiles, require("./parts/router/profile"))


    // app.use('/vue-pro', express.static(__dirname));
    app.use(router);
}