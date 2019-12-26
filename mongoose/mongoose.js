const mongoose = require('mongoose');
const db = mongoose.connection;
const config = require("../config")
let { dbURI, options } = config

// Build the connection string
// Create the database connection
mongoose.connect(dbURI, {
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(err => {
    console.log(err)
})

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

module.exports = mongoose;