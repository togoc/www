const express = require('express');
const passport = require("passport")
const router = express.Router()
const routers = require('../routers')
module.exports = app => {
    app.use(routers.vue_pro, express.static(__dirname))






    // "/vuepro/profiles"
    app.use(routers.vue_pro_profiles, require("./parts/router/profile"))

    // app.use('/vue-pro', express.static(__dirname));
    app.use(router);
}