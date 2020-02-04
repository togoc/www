const express = require('express');
const passport = require("passport")
const Swiper = require('../db/db_mallshop_swiperList')
const Cate = require("../db/db_mallshop_catitem")
const Floors = require("../db/db_mallshop_floorList")
const Categories = require("../db/db_mallshop_categories")
const GoodsList = require('../db/db_mallshop_goodslists')

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

    router.get('/mallshop/cateList', passport.authenticate('jwt', { session: false }), (req, res) => {
        Cate.find({}).then(cateList => res.status(200).json({
            message: cateList,
            meta: {
                msg: "获取成功",
                status: 200
            }
        }))
    });

    router.get('/mallshop/floorsList', passport.authenticate('jwt', { session: false }), (req, res) => {
        Floors.find({}).then(floorsList => res.status(200).json({
            message: floorsList,
            meta: {
                msg: "获取成功",
                status: 200
            }
        }))
    });

    router.get('/mallshop/categories', passport.authenticate('jwt', { session: false }), (req, res) => {
        console.log(1)
        Categories.find({}).then(categories => res.status(200).json({
            message: categories,
            meta: {
                msg: "获取成功",
                status: 200
            }
        }))
    });

    router.get('/mallshop/goodsList', passport.authenticate('jwt', { session: false }), (req, res) => {
        console.log(req.query)
        let { cid, query, pagenum, pagesize } = req.query;
        if (cid) {
            GoodsList.find({ cat_id: Number(cid) }, ['goods_name', 'goods_price', 'goods_small_logo', 'goods_id']).limit(Number(pagesize)).skip(pagesize * Number(pagenum - 1)).then(goods => {
                console.log(goods.length)
                goods.length > 0
                    ?
                    res.status(200).json({ message: goods })
                    :
                    res.status(200).json({ message: '仅录入大家电电视部分数据' })
            })
        } else {
            res.status(200).json({
                message: '缺少cid'
            });
        }
        // Categories.find({}).then(categories => res.status(200).json({
        //     message: categories,
        //     meta: {
        //         msg: "获取成功",
        //         status: 200
        //     }
        // }))
    });

    router.get('/mallshop/goodsDetail', passport.authenticate('jwt', { session: false }), (req, res) => {
        console.log(req.query)
        let { cid, goods_id } = req.query;
        if (goods_id) {
            GoodsList.find({ goods_id: Number(goods_id) }).then(goods => {
                console.log(goods.length)
                goods.length > 0
                    ?
                    res.status(200).json({ message: goods })
                    :
                    res.status(200).json({ message: '仅录入大家电电视部分数据' })
            })
        } else {
            res.status(200).json({
                message: '缺少cid'
            });
        }
        // Categories.find({}).then(categories => res.status(200).json({
        //     message: categories,
        //     meta: {
        //         msg: "获取成功",
        //         status: 200
        //     }
        // }))
    });



    app.use(router);
}


