const express = require('express');
const router = express.Router()
const path = require('path')
const passport = require("passport")
const multer = require('multer')
const fs = require('fs')
const Goods = require('../db/db_mallshop_goods')



module.exports = (app) => {
    router.post('/mallshop/postfile', passport.authenticate("jwt", { session: false }), (req, res) => {
        console.log('body-----------', req.body)
        console.log('query-----------', req.query)
            // console.log('files----------', req.files[0])
            //接收文件
        if (req.files) {
            fs.readFile('./mallshop/images/' + req.files[0].filename, (err, data) => {
                if (err) {
                    res.status(500).json({
                        message: '文件储存出错'
                    });
                    console.log(err)
                } else {
                    fs.renameSync('./mallshop/images/' + req.files[0].filename, './mallshop/images/' + req.query.id + '.png')
                        // console.log(path.resolve('./mallshop/images/' + req.query.id + '.png'))
                        // mini id  0
                    let id = req.query.id.split('-')
                    let url = "http://192.168.3.3/" + 'mallshop/images/' + req.query.id + '.png'
                    if (id[0] === 'mini') {
                        let str = "mini_pic." + id[2]
                        Goods.updateOne({ _id: id[1] }, {
                            $set: {
                                [str]: url
                            }
                        }).then(rs => {
                            res.status(200).json({
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
                            res.status(200).json({
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
                    console.log(req.body.value)
                    fs.unlinkSync('.' + req.body.value.split('http://192.168.3.3')[1])
                    res.status(200).json({
                        message: "删除成功!"
                    });
                } catch (error) {
                    res.status(400).json({
                        message: "删除出错!",
                        error
                    });
                }
            })
    });


    //处理"multipart/form-data"类型文件(post上传的)
    app.use(multer({ dest: './mallshop/images' }).array('mallshop')); //此处的array('file')对应html部分的name
    app.use(router);
}