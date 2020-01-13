var mongoose = require("mongoose")
var Schema = mongoose.Schema

const mallshop_categories = Schema({
    cat_id: {
        type: Number
    },
    cat_level: {
        type: Number
    },
    cat_pid: {
        type: Number
    },
    cat_name: {
        type: String
    },
    cat_deleted: {
        type: Boolean
    },
    cat_icon: {
        type: String
    },
    children: {
        type: Array
    }
})

module.exports = mongoose.model("mallshop_categories", mallshop_categories)
