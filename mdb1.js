const mongoose = require('mongoose');
const db = mongoose.connection;

module.exports = (dbURI, options = {}) => {
    if (dbURI === '' || dbURI === undefined)
        return
        // Build the connection string
        // Create the database connection
        // mongoose.connect(dbURI, options).catch(err1 => {
    console.log(mongoose.connect("mongodb://localhost:27017/www", {
            ...options,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch(err2 => {
            console.log(err2)
        }))
        // })

    // CONNECTION EVENTS
    // When successfully connected
    db.on('connected', function(e) {
        console.log('Mongoose 开始连接 ' + dbURI);
    });

    // If the connection throws an error
    db.on('error', function(err) {
        console.log('Mongoose 连接错误 : ' + err);
    });
    // db.once("open", function () {
    //     console.log("Mongoose 集合打开成功!")
    // })
    db.once("close", function() {
        console.log('Mongoose 断开连接')
    })
};