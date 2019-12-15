var https = require('https');
var http = require('http');
var fs = require('fs');

module.exports = app => {
    //同步读取密钥和签名证书
    var options = {
        key: fs.readFileSync(__dirname + '/keys/server.key'),
        cert: fs.readFileSync(__dirname + '/keys/server.crt')
    }
    var httpsServer = https.createServer(options, app);
    var httpServer = http.createServer(app);

    app.get('/test', function(req, res, next) {
        res.send({ msg: 'hello' });
    });




    //https监听3000端口
    httpsServer.listen(81);
    //http监听3001端口
    httpServer.listen(80);
}