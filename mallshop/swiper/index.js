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
    if (process.env.NODE_ENV === 'development') {
        let str = '1'
        const fs = require('fs')
        // fs.readFileSync('https://api.zbztb.cn/full/97225f0e1dbed84b7998dd47ba79746bacb9ca9f.jpg')
        // 'https://api.zbztb.cn/full/97225f0e1dbed84b7998dd47ba79746bacb9ca9f.jpg'
        // Categories.find({}, { "cat_id": 0 }).then(res => {
        //     res.map(v => {
        //         v.children.map(v1 => {
        //             if (v1.cat_icon)
        //                 console.log(v1.cat_icon)
        //             fs.writeFileSync('./1.txt', '<img src="' + v1.cat_icon + '" alt="">', { flag: "a" })

        //             if (Array.isArray(v1.children))
        //                 v1.children.map(v2 => {
        //                     if (v2.cat_icon)
        //                         fs.writeFileSync('./1.txt', '<img src="' + v2.cat_icon + '" alt="">', { flag: "a" })
        //                         console.log(v2.cat_icon)
        //                 })
        //         })
        //     })
        // })
        // Cate.find({}).then(list => {
        //     list.forEach(v => {
        //         v.image_src = v.image_src.replace(/https/ig, 'http')
        //         v.save()
        //     })
        //     console.log(list)
        // })


        // Floors.find({}, (err, doc) => {
        //     doc.map(v => {
        //         v.product_list.map(i => {
        //             console.log(i.image_src)
        //             i.image_src = i.image_src.replace(/https:\/\/api\.zbztb\.cn\/pyg/, 'http://106.13.184.92/mallshop/img/floor')
        //             v.markModified('product_list') //如果是数组必须使用标记才能修改
        //         })
        //         v.save()
        //     })
        // })



    }

    app.use(router);
}