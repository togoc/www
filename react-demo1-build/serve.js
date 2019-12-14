const express = require('express');
const app = express()
const List = require('./mongoose/db_list')
const Comments = require('./mongoose/db_comment_list')

//post body
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extende: false }));
app.use(bodyparser.json())


const router = express.Router();

app.use('/',express.static(__dirname+'/'));

router.get('/lists', (req, res) => {
    List.find({}, ['_id', 'title']).then(list => {
        res.status(200).json(list);
    })
});


router.get('/people', (req, res) => {
    List.find({}, ['_id', 'title', 'author']).sort({ _id: -1 }).then(list => {
        res.status(200).json(list);
    })
});

router.get('/comment/:id', (req, res) => {
    Comments.find({ tid: req.params.id }).sort({ _id: 1 }).then(list => {
        res.status(200).json(list);
    }).catch(err => console.log(err))
});

router.get('/comment/like/:id', (req, res) => {
    Comments.updateOne({ _id: req.params.id }, { $push: { "likes": req.query.uname }, $pull: { "dislikes": req.query.uname } })
        .then(like => {
            Comments.find({ _id: req.params.id }).sort({ _id: 1 }).then(list => {
                res.status(200).json(list);
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
});

router.get('/comment/dislike/:id', (req, res) => {
    Comments.updateOne({ _id: req.params.id }, { $pull: { "likes": req.query.uname }, $push: { "dislikes": req.query.uname } })
        .then(like => {
            Comments.find({ _id: req.params.id }).sort({ _id: 1 }).then(list => {
                res.status(200).json(list);
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
});


router.post('/addcomment/:id', (req, res) => {
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




router.post('/add', (req, res) => {
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

router.get('/lists/:id', (req, res) => {
    List.findOne({ _id: req.params.id }).then(list => {
        res.status(200).json(list);
    }).catch(err => {
        res.status(400).json({ err });
    })
});




app.use(router);




app.listen(5000, () => {
    console.log(`Server started on 5000`);
});