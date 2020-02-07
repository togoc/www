const express = require('express');
const router = express.Router()
const RMD = require('../utils/md/index')
const DB = require('./db/index')
module.exports = (app) => {

    router.get('/detail', (req, res) => {
        const { source } = req.query
        res.send(RMD(`./react-search/md/${source}.md`));
    });

    router.get('/order-list', (req, res) => {
        const { keyword } = req.query
        const reg = new RegExp(keyword[0], 'i')
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
            arr.sort((a, b) => {
                return b.weight - a.weight
            })
            res.status(200).json(arr);
        }).catch(err => res.status(500).json(err))
    })

    router.get('/form-list', (req, res) => {
        const { keyword } = req.query
        const reg = new RegExp(keyword[0], 'i')
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
            arr.sort((a, b) => {
                return b.weight - a.weight
            })
            res.status(200).json(arr);
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
    app.use('/react-search', express.static(__dirname));
}


