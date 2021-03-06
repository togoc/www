const express = require('express');
const router = express.Router()
const passport = require("passport")
const BuyList = require('../db/db_mallshop_buyList')
const Goods = require('../db/db_mallshop_goods')
module.exports = app => {
    router.post('/mallshop/addbuylist', passport.authenticate("jwt", { session: false }), (req, res) => {
        try {
            new Promise((rs, rj) => {
                BuyList.find({ buyuid: req.user.id }).then(list => {
                    let length = 0
                    if (list.length === 0) rs(true)
                    for (let index = 0; index < list.length; index++) {
                        if (list[index].state === 0) {
                            rj(false)
                            break
                        } else {
                            length++
                            if (length === (index + 1)) {
                                rs(true)
                            }
                        }
                    }
                })
            }).then(save => {
                if (save) {
                    let length = 0
                    req.body.forEach(item => {
                        item.gid = item._id
                        delete item._id
                        delete item.state
                        let buyList = new BuyList({ ...item })
                        buyList.save().then(msg => {
                            length++
                            if (length === req.body.length) {
                                res.status(200).json({
                                    message: '即将跳转支付'
                                });
                            }
                        })
                    });
                }
            }).catch(err => {
                res.status(200).json({
                    message: '您有未完成订单'
                });
            })
        } catch (error) {
            res.status(500).json({
                message: '数据库存储出错'
            });
        }
    });


    router.get('/mallshop/getbuylist', passport.authenticate("jwt", { session: false }), (req, res) => {
        let { id } = req.user
        BuyList.find({ buyuid: req.user.id }).then(list => {
            res.status(200).json(list);;
        })
    });

    router.post('/mallshop/editbuylist', passport.authenticate("jwt", { session: false }), (req, res) => {
        try {
            let { type, query } = req.body
            if (type === 'cancel') {
                if (Array.isArray(query)) {
                    BuyList.updateMany({
                        $or: query,
                    }, { $set: { state: 3 } }).then(list => {
                        res.status(200).json({
                            message: '取消成功'
                        });
                        console.log(list)
                    })
                } else {
                    res.status(500).json({
                        message: '错误请求'
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                message: '错误请求'
            });
            console.log(error)
        }
    });

    router.post('/mallshop/pay', passport.authenticate("jwt", { session: false }), (req, res) => {
        let arr = []

        req.body.map(item => {
            let { _id } = item
            Goods.findOne({ _id: item.gid }).then(good => {
                if (good.count < item.num) {
                    arr.push({ _id, ok: 0 })
                    if (req.body.length === arr.length) {
                        res.status(200).json(arr);
                    }
                } else {
                    Goods.updateOne({ _id: item.gid }, { count: good.count - 1, sold: good.sold + item.num }).then(update_goods => {
                        BuyList.updateOne({ _id: item._id }, { state: 1 }).then(payok => {
                            arr.push({ _id, ok: 1 })
                            if (req.body.length === arr.length) {
                                res.status(200).json(arr);
                            }
                        })
                    })
                }
            })
        });
    });


    app.use(router);
}