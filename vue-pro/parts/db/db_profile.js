var mongoose = require("mongoose")

var Schema = mongoose.Schema

//创建集合
var profileSchema = Schema({
    type: {
        type: String,
        default: "佚名"
    },
    describe: {
        type: String,
        require: true
    },
    expend: {
        type: Number,
        require: true
    },
    income: {
        type: Number,
        require: true
    },
    cash: {
        type: Number,
        require: true
    },
    remark: {
        type: String,
        default: "xxx@xxx.com"
    },
    date: {
        type: Number,
        default: Date.now()
    }
})


module.exports = mongoose.model("vueproProfile", profileSchema)