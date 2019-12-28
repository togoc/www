const express = require('express');
const router = express.Router()
const Goods = require('../db/db_mallshop_goods')
const passport = require("passport")

module.exports = app => {
    //添加 商品
    router.post('/mallshop/addgoods', passport.authenticate('jwt', { session: false }), (req, res) => {
        // 处理 
        req.body.uid = req.user._id
            // console.log(req.user)

        // 判断(同一个商家 不能有同名商品)
        Goods.findOne({ uid: req.user._id, _id: req.body._id }, ['_id']).then(goods => {
                if (goods) {
                    Goods.updateOne({ _id: goods._id }, req.body).then(newGoods => {
                        res.status(201).json({
                            message: '商品修改成功',
                            loadId: goods._id
                        });
                    }).catch(err => {
                        res.status(500).json({
                            message: '数据库储存出错',
                            err
                        });
                    })
                } else {
                    let good = new Goods({
                        ...req.body
                    })
                    good.save().then(good => {
                        res.status(201).json({
                            message: '商品存储成功',
                            loadId: good._id
                        });
                    }).catch(err => res.status(500).json({
                        message: '数据库储存出错',
                        err
                    }))
                }

            }).catch(err => {
                res.status(500).json({
                    message: '数据库储存出错'
                });
            })
            // 存储数据库 


    });

    // 获取管理商品列表
    router.post('/mallshop/manageList', passport.authenticate('jwt', { session: false }), (req, res) => {
        let { index } = req.body
        if (req.body.type === 'business') {
            Goods.find({ uid: req.user._id }).sort({ sold: -1 }).then(goodsList => {
                res.status(200).json(goodsList);
            }).catch(err => {
                res.status(500).json({
                    message: '数据库储存出错'
                });
            })
        } else {
            Goods.find({ state: 'on' }).sort({ sold: -1 }).limit(6).skip(6 * index).then(goodsList => {
                if (goodsList.length === 0) {
                    res.status(200).json({
                        message: '数据已经读取全部'
                    });

                } else {
                    res.status(200).json(goodsList);
                }
            }).catch(err => {
                res.status(500).json({
                    message: '数据库储存出错'
                });
            })
        }
    });

    router.get('/mallshop/goodsitem', passport.authenticate('jwt', { session: false }), (req, res) => {
        let { id } = req.query
        try {
            Goods.findOne({ _id: id }).then(item => {
                if (item) {
                    res.status(200).json(item);
                }
            })
        } catch (error) {
            res.status(500).json({
                message: '数据库储存出错',
                error
            });
        }
    });




    app.use(router);
}