var mongoose = require("mongoose")
var Schema = mongoose.Schema

const mallshop_swiperlist = Schema({

    image_src: {
        type: String
    },
    open_type: {
        type: String
    },
    goods_id: {
        type: String
    },
    navigator_url: {
        type: String
    }
})


module.exports = mongoose.model("mallshop_swiperlist", mallshop_swiperlist)
