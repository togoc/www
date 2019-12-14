const express = require('express');
const List = require('../db/db_list')
const router = express.Router()
module.exports = app => {

    router.get('/test', (req, res) => {
        res.send("ok");
    });


    router.get('/:id', (req, res) => {
        List.find({ uid: req.params.id }).then(msg => {
            res.status(200).json(msg)
        })
    });

    router.get('/delete/:id', (req, res) => {
        List.deleteOne({ _id: req.params.id })
            .then(profile => {
                if (profile)
                    res.json(profile)
            })
            .catch(err => res.status(404).json("删除失败!"))
    });


    router.post('/add', (req, res) => {
        console.log(req.body)
        let newList = new List({
            uid: req.body.uid,
            container: req.body.container
        })
        newList.save().then(re => res.status(200).json(re)).catch(err => console.log(err))
    });

    router.post('/edit/:id', (req, res) => {
        let list = {}
        if (req.body.done) {
            req.body.done === "false" ? list.done = false : list.done = true
        }
        if (req.body.major) {
            req.body.major === "false" ? list.major = false : list.major = true
        }
        List.updateOne({ _id: req.params.id }, { $set: list }, { new: true })
            .then(profile => res.json(profile))
    });






    app.use("/todos/list", router);

}