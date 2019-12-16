const passport = require("passport")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const User = require('./db_user')
const routers = require('../routers')
// require("./passport")(passport)

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash('togoc', salt, function(err, hash) {
//         console.log(hash)
//         bcrypt.compare('togoc', hash).then(res =>{
//             console.log(res)
//         }).catch(err=>console.log(err))
//     });
// });


module.exports = app => {
    // app.use(passport.initialize())

    // '/register'
    app.post(routers.index_register, (req, res) => {
        console.log(req.body.name)
        if (!req.body.name) return res.status(400).json({ message: '没有用户名' });
        User.find({ name: req.body.name }).then(users => {
            if (users.length === 0) {
                let uesr = new User({
                    name: req.body.name
                })
                uesr.save().then(save => {
                    let { _id, name, email, date } = save
                    jwt.sign({ _id, name, email, date }, 'secret', { expiresIn: 3600 }, (err, token) => {
                        res.status(200).json({
                            success: true,
                            token: "Bearer " + token
                        })
                    })
                })

            } else {
                return res.status(400).json({ message: '用户已存在' });
            }
        }).catch(err => {
            res.status(400).json(err);
        })

    });

    // '/login'
    app.post(routers.index_login, (req, res) => {
        User.findOne({ name: req.body.name }).then(user => {
            if (user) {
                let { _id, name, email, date } = user
                jwt.sign({ _id, name, email, date }, 'secret', { expiresIn: 3600 }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                res.status(400).json({ message: '无匹配' });
            }
        }).catch(err => {
            res.status(400).json(err);
        })
    });

    app.get(routers.index, passport.authenticate("jwt", { session: false }), (req, res) => {
        console.log(req.user)
        res.send('ok');
    });



}