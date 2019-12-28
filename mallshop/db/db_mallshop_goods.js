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

// uid: '123',
//     goods: [{
//         name: "10公斤新奥尔良2号11111111111",
//         goodsId: '1231',
//         price: 121,
//         coupon: 5,
//         count: 1,
//         storeId: '123',
//         state: ''
//     }],

module.exports = mongoose.model("mallshop_goods", mallshop_goods)