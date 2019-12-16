const express = require('express');
const List = require('../mongoose/db_list')
const Comments = require('../mongoose/db_comment_list')
const routers = require('../routers')
const router = express.Router();

module.exports = (app) => {

    // '/lists'
    router.get(routers.react_demo1_list, (req, res) => {
        List.find({}, ['_id', 'title']).then(list => {
            res.status(200).json(list);
        })
    });

    // '/people'
    router.get(routers.react_demo1_people, (req, res) => {
        List.find({}, ['_id', 'title', 'author']).sort({ _id: -1 }).then(list => {
            res.status(200).json(list);
        })
    });

    // '/comment/:id'
    router.get(routers.react_demo1_comment, (req, res) => {
        Comments.find({ tid: req.params.id }).sort({ _id: 1 }).then(list => {
            res.status(200).json(list);
        }).catch(err => console.log(err))
    });

    // '/comment/like/:id'
    router.get(routers.react_demo1_comment_like, (req, res) => {
        Comments.updateOne({ _id: req.params.id }, { $push: { "likes": req.query.uname }, $pull: { "dislikes": req.query.uname } })
            .then(like => {
                Comments.find({ _id: req.params.id }).sort({ _id: 1 }).then(list => {
                    res.status(200).json(list);
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    });

    // '/comment/dislike/:id'
    router.get(routers.react_demo1_comment_dislike, (req, res) => {
        Comments.updateOne({ _id: req.params.id }, { $pull: { "likes": req.query.uname }, $push: { "dislikes": req.query.uname } })
            .then(like => {
                Comments.find({ _id: req.params.id }).sort({ _id: 1 }).then(list => {
                    res.status(200).json(list);
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
    });

    // '/addcomment/:id'
    router.post(routers.react_demo1_addcomment, (req, res) => {
        req.body.tid = req.params.id
        comment = new Comments(req.body)
        comment.save().then(list => {
            Comments.find({ tid: req.body.tid }).then(coms => {
                res.status(200).json(coms)
            }).catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    });



    // '/add'
    router.post(routers.react_demo1_add, (req, res) => {
        if (!req.body.title || !req.body.author || !req.body.content || !req.body.translate || !req.body.reference) {
            res.status(401).json({
                error: 'something was empty'
            });
            return
        }
        let { title } = req.body
        List.findOne({ title }, ['title']).then(list => {
            if (list) {
                res.status(400).json(list)
            } else {
                let article = new List(req.body)
                article.save().then(list => {
                    res.status(200).json(list)
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))

    });
    // '/lists/:id'
    router.get(routers.react_demo1_list, (req, res) => {
        List.findOne({ _id: req.params.id }).then(list => {
            res.status(200).json(list);
        }).catch(err => {
            res.status(400).json({ err });
        })
    });

    /// 'react-demo1'
    app.use(routers.react_demo1, express.static(__dirname + '/'));
    app.use(router);

}