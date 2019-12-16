var mongoose = require("mongoose")

var Schema = mongoose.Schema

//创建集合
var UserSchema = Schema({
    email: {
        type: String,
        default: "xxx@xxx.com"
    },
    avatar: {
        type: String
    },
    name: {
        type: String,
        require: true
    },
    date: {
        type: Number,
        default: Date.now()
    }
})


module.exports = mongoose.model("User", UserSchema)