var mongoose = require("mongoose")
var Schema = mongoose.Schema

const mallshop_catitems = Schema({

    image_src: {
        type: String
    },
    name: {
        type: String
    }
})


module.exports = mongoose.model("mallshop_catitems", mallshop_catitems)

