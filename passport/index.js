const express = require('express');
const passport = require("passport")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
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

    const rule = { id: 123, name: 'togoc'}
        // jwt.sign("规则", "加密名字", "过期时间", "箭头函数")
    app.post('/register', (req, res) => {
        console.log(req.body.name)
        jwt.sign(rule, 'secret', { expiresIn: 100 }, (err, token) => {
            res.json({
                success: true,
                token: "Bearer " + token
            })
        })
    });

    app.get('/login', passport.authenticate("jwt", { session: false }), (req, res) => {
        res.json(req.user)
    });

    app.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
        res.send('value');
    });



}