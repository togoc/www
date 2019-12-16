var mongoose = require("mongoose")

var Schema = mongoose.Schema

//创建集合
var userSchema = Schema({
    name: {
        type: String,
        require: true
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
        type: String
    },
    avatar: {
        type: String
    },
    email: {
        type: String
    },
    date: {
        type: Number,
        default: Date.now()
    }
})


module.exports = mongoose.model("users", userSchema)