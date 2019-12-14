module.exports = {
    dbURI: "mongodb://106.13.184.92:27017/react-article",
    options: {
        useNewUrlParser: true, //使用客户端
        useUnifiedTopology: true, //报错
        authSource: "react-article",
        user: "react",
        pass: "98d1e3bcdd"
    }
}