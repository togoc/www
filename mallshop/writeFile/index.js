const express = require('express');
const router = express.Router()
const path = require('path')
const passport = require("passport")
const multer = require('multer')
const fs = require('fs')
const Goods = require('../db/db_mallshop_goods')
const config = require('../../config')

module.exports = (app) => {
    router.post('/mallshop/postfile', passport.authenticate("jwt", { session: false }), (req, res) => {
        // console.log('files----------', req.files[0])
        //接收文件
        if (req.files) {
            fs.readFile(path.resolve('./mallshop/images/') + '/' + req.files[0].filename, (err, data) => {
                if (err) {
                    res.status(500).json({
                        message: '文件储存出错'
                    });
                    console.log(err)
                } else {
                    fs.renameSync(path.resolve('./mallshop/images') + '/' + req.files[0].filename, path.resolve('./mallshop/images') + '/' + req.query.id + '.png')
                    let id = req.query.id.split('-')
                    let url = config.localhost + '/mallshop/images/' + req.query.id + '.png'
                    if (id[0] === 'mini') {
                        let str = "mini_pic." + id[2]
                        Goods.updateOne({ _id: id[1] }, {
                            $set: {
                                [str]: url
                            }
                        }).then(rs => {
                            res.status(201).json({
                                message: "保存成功"
                            });
                        })
                    } else if (id[0] === 'detail') {
                        let str = "detail_pic." + id[2]
                        Goods.updateOne({ _id: id[1] }, {
                            $set: {
                                [str]: url
                            }
                        }).then(rs => {
                            res.status(201).json({
                                message: "保存成功"
                            });
                        })

                    }

                }
            })
        } else {
            res.status(500).json({
                message: '请求错误'
            });
        }
    });

    router.post('/mallshop/deletePic', passport.authenticate('jwt', { session: false }), (req, res) => {
        let str = req.body.type + '_pic'
        Goods.updateOne({ _id: req.body._id }, {
                $pull: {
                    [str]: req.body.value
                }
            })
            .then(delItem => {
                try {
                    fs.unlinkSync(path.resolve('.' + req.body.value.split(config.localhost)[1]))
                    res.status(200).json({
                        message: "删除成功!"
                    });
                } catch (error) {
                    console.log(error)
                    res.status(400).json({
                        message: "删除出错!",
                        error
                    });
                }
            })
    });


    //处理"multipart/form-data"类型文件(post上传的)
    //路径为根目录开始的 服务器再根目录
    app.use(multer({ dest: path.resolve('./mallshop/images/') }).array('mallshop')); //此处的array('file')对应html部分的name
    app.use(router);
}