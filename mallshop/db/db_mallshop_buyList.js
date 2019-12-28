var mongoose = require("mongoose")

var Schema = mongoose.Schema

//创建集合
var MallShop_BuyList = Schema({
    buyuid: {
        type: String,
        require: true
    },
    suid: {
        type: String,
        require: true
    },
    gid: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    brande: {
        type: String
    },
    type: {
        type: String,
        require: true
    },
    cut: {
        type: Number,
    },
    count: {
        type: Number,
        require: true
    },
    detail: {
        type: String
    },
    sold: {
        type: Number,
        default: 0
    },
    maxBuy: {
        type: Number,
        require: true
    },
    postage: {
        type: Number,
        require: true
    },
    mini_pic: {
        type: Array
    },
    detail_pic: {
        type: Array
    },
    selectStyle: {
        type: String
    },
    num: {
        type: Number
    },
    date: {
        type: Number,
        default: Date.now()
    },
    state: {
        type: Number,
        default: 0 // o:待付款 1:已付款 2:已完成 3:已取消
    }
})



module.exports = mongoose.model("mallshop_buylist", MallShop_BuyList)