var mongoose = require("mongoose")
var Schema = mongoose.Schema

const mallshop_floorlists = Schema({
    name: {
        type: String
    },
    floor_title: {
        type: Array
    },
    product_list: {
        type: Array
    }
})


module.exports = mongoose.model("mallshop_floorlists", mallshop_floorlists)
