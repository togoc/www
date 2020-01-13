const express = require('express');
const passport = require("passport")
const Swiper = require('../db/db_mallshop_swiperList')
const Cate = require("../db/db_mallshop_catitem")


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


    Cate.find({
        image_src: {
            $regex: /icon_index_nav_2@2x\.png/ig
        }
    }).then(list => {
        console.log(list)
        list.forEach(v => {
            v.image_src = v.image_src.replace(/icon_index_nav_2@2x\.png/ig, 'icon_index_nav_2@2x.png')
            // v.save()
        })
        console.log(list)
    })

    app.use(router);
}