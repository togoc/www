const express = require('express');
const history = require('connect-history-api-fallback');
module.exports = (app) => {

    app.use('/mallshop', history());
    app.use('/mallshop', express.static(__dirname))


    //支付相关
    require('./pay')(app)

    //图片保存
    require('./writeFile')(app)

    // 添加商品
    require('./goods')(app)

    //获取首页轮播图
    require('./list')(app)


}