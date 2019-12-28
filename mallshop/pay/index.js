const express = require('express');
const router = express.Router()
const passport = require("passport")
const BuyList = require('../db/db_mallshop_buyList')
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
                            let buyList = new BuyList({...item })
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






        app.use(router);
    }
    // app.get(routers.index, passport.authenticate("jwt", { session: false }), (req, res) => {
    //     console.log(req.user)
    //     res.send('ok');
    // });