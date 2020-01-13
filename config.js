let host = null
process.env.NODE_env === 'development' ? host = '127.0.0.1' : host = '106.13.184.92'
module.exports = {
    dbURI: "mongodb://" + host + ":27017/www",
    localhost: 'http://' + host,
    options: {
        useNewUrlParser: true, //使用客户端
        useUnifiedTopology: true, //报错
        authSource: "www",
        user: "www",
        pass: "98d1e3bcdd"
    },
    secret: "secret",
    passPortTimeOut: 99999
}