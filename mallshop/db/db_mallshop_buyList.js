var mongoose = require("./mongoose")

var Schema = mongoose.Schema

//创建集合
var MallShop_ButList = Schema({
    uid: {
        type: String,
        require: true
    },
    goods: {
        type: Array,
        require: true
    }
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

module.exports = mongoose.model("mallshop_butlist", MallShop_ButList)