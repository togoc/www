var mongoose = require("mongoose")

var Schema = mongoose.Schema

//创建集合
var UserSchema = Schema({
    email: {
        type: String,
        default: "佚名"
    },
    avatar: {
        type: String
    }
})


module.exports = mongoose.model("User", UserSchema)