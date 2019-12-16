const express = require('express');
const passport = require("passport")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const User = require('./db_user')
require("./passport")(passport)

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash('togoc', salt, function(err, hash) {
//         console.log(hash)
//         bcrypt.compare('togoc', hash).then(res =>{
//             console.log(res)
//         }).catch(err=>console.log(err))
//     });
// });


module.exports = app => {
    app.use(passport.initialize())

    // jwt.sign("规则", "加密名字", "过期时间", "箭头函数")
    app.post('/register', (req, res) => {
        console.log(req.body.name)
        if (!req.body.name) return res.status(400).json({ message: '没有用户名' });
        User.find({ name: req.body.name }).then(users => {
                if (users.length === 0) {
                    let uesr = new User({
                        name: req.body.name
                    })
                    uesr.save().then(save => {
                        console.log('save  ' + save)
                            // const rule = { id: 123, name: 'togoc' }
                    })

                } else {
                    return res.status(400).json({ message: '用户已存在' });
                }
            })
            // jwt.sign(rule, 'secret', { expiresIn: 3600 }, (err, token) => {
            //     res.json({
            //         success: true,
            //         token: "Bearer " + token
            //     })
            // })
    });

    app.get('/login', passport.authenticate("jwt", { session: false }), (req, res) => {
        console.log(req.body.name)

        res.json(req.user)
    });

    app.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
        res.send('ok');
    });



}