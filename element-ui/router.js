const express = require('express');
const history = require('connect-history-api-fallback');
const routers = require('../routers')
module.exports = (app) => {
    app.use(routers.elment, history());
    app.use(routers.elment, express.static(__dirname));
}