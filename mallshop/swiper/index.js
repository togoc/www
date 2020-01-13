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
        let str = ''
        const fs = require('fs')
        // fs.readFileSync('https://api.zbztb.cn/full/97225f0e1dbed84b7998dd47ba79746bacb9ca9f.jpg')
        // 'https://api.zbztb.cn/full/97225f0e1dbed84b7998dd47ba79746bacb9ca9f.jpg'
        // http://106.13.184.92/mallshop/img/categories/fdcf05601f6381c9f9ca3f18ea9cd52685e4cdb3.jpg
        Categories.find({}).then(res => {
            console.log(res)
            res.map(v => {
                v.children.map(v1 => {
                    if (v1.cat_icon) {
                        // https://api.zbztb.cn/full/7b76d481a3d2433ee25dd513dff794242e5ac1bf.jpg
                        // http://106.13.184.92/mallshop/img/categories/fdcf05601f6381c9f9ca3f18ea9cd52685e4cdb3.jpg
                        // v1.cat_icon = v1.cat_icon.replace(/https:\/\/api\.zbztb\.cn\/full/, 'http://106.13.184.92/mallshop/img/categories')
                        // v.markModified('children') //如果是数组必须使用标记才能修改
                    }
                    if (Array.isArray(v1.children)) {
                        v1.children.map(v2 => {
                            if (v2.cat_icon) {
                                // v2.cat_icon = v2.cat_icon.replace(/https:\/\/api\.zbztb\.cn\/full/, 'http://106.13.184.92/mallshop/img/categories')
                                // v.markModified('children') //如果是数组必须使用标记才能修改
                                let str1 = '<img src="' + v2.cat_icon + '" alt="">'
                                str += str1
                                console.log(v2.cat_icon)
                            }
                        })
                    }
                })
                // v.save()
            })
            // fs.writeFileSync('./1.txt', str, { flag: "a" })
        })
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