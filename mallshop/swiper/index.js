const express = require('express');
const passport = require("passport")
const Swiper = require('../db/db_mallshop_swiperList')



const router = express.Router()

module.exports = (app) => {

    router.get('/mallshop/swiperList', passport.authenticate('jwt', { session: false }), (req, res) => {
        Swiper.find({}).then(swiperList => res.status(200).json({
            message: swiperList,
            meta: {
                msg: "获取成功",
                status: 200
            }
        }))

    });


    app.use(router);
}