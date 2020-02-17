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


    //https监听3000端口
    httpsServer.listen(81, () => {
        console.log('https://127.0.0.1:81')
    });
    //http监听3001端口
    httpServer.listen(80, () => {
        console.log('http://127.0.0.1')
    });
}