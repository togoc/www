const express = require('express');
const history = require('connect-history-api-fallback');

module.exports = (app) => {
    app.use('/element-ui', history());
    app.use('/element-ui', express.static(__dirname));
}