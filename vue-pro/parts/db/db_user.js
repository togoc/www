var mongoose = require("mongoose")

var Schema = mongoose.Schema

//创建集合
var userSchema = Schema({
    name: {
        type: String,
        default: "佚名"
    },
    password: {
        type: String,
        require: true
    },
    identity: {
        type: String,
        default: "employee"
    },
    gender: {
        type: String,
        default: "男"
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        default: "xxx@xxx.com"
    },
    date: {
        type: Number,
        default: Date.now()
    }
})


module.exports = mongoose.model("vueproUsers", userSchema)