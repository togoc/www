const express = require('express');
const router = express.Router()
const RMD = require('../utils/md/index')
const DB = require('./db/index')
module.exports = (app) => {
    router.get('/md', (req, res) => {
        res.send(RMD('./react-search/test.md'));
    });
    router.get('/order-list', (req, res) => {
        try {
            const { keyword } = req.query
            let arr = []
            let time = 0
            keyword.split("").forEach(async (v, index) => {
                let reg = new RegExp(v, 'i')
                let list = await DB.list.find({ keyword: reg }, ['_id', 'keyword'])
                time++
                if (arr.length === 0) {
                    arr = [...arr, ...list]
                } else {
                    list.forEach(v1 => {
                        let t = 0
                        arr.forEach(v2 => {
                            if (v1.keyword === v2.keyword) {
                                v2.weight = 1
                            } else {
                                t++
                                if (t === arr.length)
                                    arr.push(v1)
                            }
                        })
                    })
                }
                if ((index + 1) === keyword.length || time === keyword.length) {
                    res.status(200).json(arr);
                }
            });
        } catch (error) {
            console.log(2)
        }
    });
    router.get('/form-list', (req, res) => {
        try {
            const { keyword } = req.query
            console.log(keyword)
            let arr = []
            let time = 0
            let arr1 = keyword.replace(/\s+/g, " ").split(" ")
            arr1.forEach(async (v, index) => {
                let reg = new RegExp(v, 'i')
                let list = await DB.list.find({ keyword: reg })
                time++
                if (arr.length === 0) {
                    arr = [...arr, ...list]
                } else {
                    list.forEach(v1 => {
                        let t = 0
                        arr.forEach(v2 => {
                            if (v1.keyword === v2.keyword) {
                                v2.weight = 1
                            } else {
                                t++
                                if (t === arr.length)
                                    arr.push(v1)
                            }
                        })
                    })
                }
                if ((index + 1) === arr1.length || time === arr1.length) {
                    console.log(arr)
                    res.status(200).json(arr);
                }
            });
        } catch (error) {
            console.log(1)
        }
    });

    router.get('/main-list', (req, res) => {
        DB.list.find({}).then(list => {
            res.status(200).json(list);
        })
    });
    router.post('/add', (req, res) => {
        let { keyword, main, git, source, } = req.body
        let item = new DB.list({
            keyword, main, git, source,
        })
        item.save()
        res.send('ok');
    });
    app.use('/api/search', router);
}


