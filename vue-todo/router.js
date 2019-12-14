const express = require('express');
const router = express.Router()


//history mode 防止刷新空白
const history = require('connect-history-api-fallback');
history({
    index: '/vue-todo/'
});
// app.use("/", express.static("public"))

module.exports = (app) => {
    router.get('/vue-todo/*', (req, res) => {
        // res.send('value');
        res.sendFile(__dirname + '/')
    });

    router.get('/vue-todo/a', (req, res) => {
        res.send('value');
        // res.sendFile(__dirname + '/')
    });

    // app.use(history());
    app.use('/vue-todo', express.static(__dirname + '/'));
    app.use(router);




    

}