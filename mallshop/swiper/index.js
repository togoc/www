const express = require('express');
const passport = require("passport")
const Swiper = require('../db/db_mallshop_swiperList')
const Cate = require("../db/db_mallshop_catitem")
const Floors = require("../db/db_mallshop_floorList")
const Categories = require("../db/db_mallshop_categories")


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
    //修改导入的数据
    if (process.env.NODE_ENV == 'development') {
        const procy = require('../../procy')
        const fs = require('fs')
        let arr = []
        // Categories.find({}).then(res => {
        // res.map(v => {
        //     if (v.children) {
        //         v.children.map(v1 => {
        //             if (v1.children) {
        //                 v1.children.map(v2 => {
        //                     if (v2.cat_icon) {
        //                         // arr.push(v2.cat_id)
        //                         let getGoodsListUrl = 'http://106.13.184.92/mallshop/login'
        //                         procy(getGoodsListUrl).then(res => {
        //                             console.log(res)
        //                         }).catch(err => {
        //                             console.log(err)
        //                         })
        //                     }
        //                 })
        //             }
        //         })
        //     }
        // })


        // let getGoodsListUrl = 'https://www.suning.com/'
        // procy(getGoodsListUrl).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(er)
        // })
        // arr.map(item => {
        // })
        // let getGoodsUrl = 'https://api.zbztb.cn/api/public/v1/goods/detail?goods_id=57444';
        // })


        // async function requeryGoods(url) {
        //     let res = await procy(url)
        //     fs.writeFile('tt.txt', JSON.stringify(res.message), { flag: 'a' }, (err) => {
        //         if (err) {
        //             console.log(err)
        //         }
        //     })
        // }


    }

    app.use(router);
}


