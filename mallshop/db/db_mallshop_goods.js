var mongoose = require("mongoose")

var Schema = mongoose.Schema

//创建集合
var mallshop_goods = Schema({
    suid: {
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
    comments: {
        type: Array,
        default: []
    },
    state: {
        type: String,
        default: 'out'
    },
    style: {
        type: Array
    },
})

module.exports = mongoose.model("mallshop_goods", mallshop_goods)