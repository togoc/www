var mongoose = require("mongoose")

var Schema = mongoose.Schema

//创建集合
var todoListSchema = Schema({
    uid: {
        type: String,
        require: true
    },
    container: {
        type: String,
        require: true
    },
    date: {
        type: Number,
        default: Date.now()
    },
    done:{
        type:Boolean,
        default:false
    },
    major:{
        type:Boolean,
        default:false
    },

})


module.exports = mongoose.model("todoList", todoListSchema)