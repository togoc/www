const express = require('express');
const router = express.Router()
const RMD = require('../utils/md/index')
const request = require('../procy')
const DB = require('./db/index')
module.exports = (app) => {

    router.get('/detail', (req, res) => {
        const { source } = req.query
        res.send(RMD(`./react-search/md/${source}.md`));
    });

    router.get('/order-list', async (req, res) => {
        const { keyword } = req.query
        if (keyword.replace(/\s+/g, "") === "") {
            return res.status(200).json([])
        }
        const reg = new RegExp(keyword[0], 'i')

        //多服务器查询
        let list1 = []
        if (process.env.NODE_ENV === 'development')
            list1 = (keyword.slice(1) === "" ? [] : await request('http://106.13.184.92/api/search/order-list?keyword=' + encodeURIComponent(keyword.slice(1))))

        DB.list.find({ keyword: reg }, ['_id', 'keyword']).then(list => {
            const arr = list.map(v1 => {
                v1.weight = 1
                return v1
            })
            for (let i = 1; i <= keyword.length; i++) {
                for (let j = i + 1; j <= keyword.length; j++) {
                    arr.forEach(v2 => v2.keyword.toLowerCase().indexOf(keyword.slice(i, j)) !== -1 && v2.weight++)
                }
            }

            //多服务器查询
            if (process.env.NODE_ENV === 'development') {
                list1.forEach(item1 => {
                    let t = 0
                    arr.forEach(item => {
                        item.keyword === item1.keyword ? item.weight += 1 : (t === arr.length && arr.push(item1))
                        t++
                    })
                })
            }

            arr.sort((a, b) => {
                return b.weight - a.weight
            })
            res.status(200).json(arr);
        }).catch(err => res.status(500).json(err))
    })

    router.get('/form-list', async (req, res) => {
        const { keyword } = req.query
        if (keyword.replace(/\s+/g, "") === "") {
            return res.status(200).json([])
        }
        const reg = new RegExp(keyword[0], 'i')

        //多服务器查询
        let list1 = []
        if (process.env.NODE_ENV === 'development')
            list1 = (keyword.slice(1) === "" ? [] : await request('http://106.13.184.92/api/search/form-list?keyword=' + encodeURIComponent(keyword.slice(1))))

        DB.list.find({ keyword: reg }).then(list => {
            const arr = list.map(v1 => {
                v1.weight = 1
                return v1
            })
            for (let i = 1; i <= keyword.length; i++) {
                for (let j = i + 1; j <= keyword.length; j++) {
                    arr.forEach(v2 => v2.keyword.toLowerCase().indexOf(keyword.slice(i, j)) !== -1 && v2.weight++)
                }
            }

            //多服务器查询
            if (process.env.NODE_ENV === 'development') {
                list1.forEach(item1 => {
                    let t = 0
                    arr.forEach(item => {
                        item.keyword === item1.keyword ? item.weight += 1 : (t === arr.length && arr.push(item1))
                        t++
                    })
                })
            }

            arr.sort((a, b) => {
                return b.weight - a.weight
            })
            res.status(200).json(arr);
        }).catch(err => res.status(500).json(err))
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
    app.use('/react-search', express.static(__dirname));
}


