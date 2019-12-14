var mongoose = require("./mongoose")

var Schema = mongoose.Schema

//创建集合
var ListSchema = Schema({
    likes: {
        type: Array,
        default: []
    },
    dislikes: {
        type: Array,
        default: []
    },
    tid: {
        type: String,
        require: true
    },
    uid: {
        type: Number,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    datetime: {
        type: Number,
        default: Date.now()
    },
})


module.exports = mongoose.model("CommentList", ListSchema)