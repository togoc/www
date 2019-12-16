const express = require("express")
const User = require("./db_user")
const router = express.Router()
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const config = require("../config")
    //加密
const bcrypt = require("bcryptjs")

module.exports = app => {

    //  测试: $router : /users/test
    router.get("/test", (req, res) => {
        res.send("ok test")
    })

    //  注册: $router : /users/register
    router.post("/register", (req, res) => {
        console.log(req.body)
        if (!req.body.name && !req.body.email) return res.status(400).json({ message: '缺少邮箱和用户名' });
        User.findOne(req.body.email ? { email: req.body.email } : { name: req.body.name }).then((user) => {
            if (user) {
                return res.status(400).json({ msg: req.body.email ? "邮箱已经被注册" : "用户名已经被注册" })
            } else {
                let avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    identity: req.body.identity,
                    password: req.body.password
                })
                if (req.body.password) {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(newUser.password, salt, function(err, hash) {
                            if (err) throw err;
                            newUser.password = hash
                            newUser.save().then(re => res.status(200).json(re)).catch(err => console.log(err))
                        });
                    });
                } else {
                    newUser.save().then(re => res.status(200).json(re)).catch(err => console.log(err))
                }
            }
        }).catch(err => {
            console.log(err)
        })
    })


    //  登录: $router : /users/register
    router.post("/login", (req, res) => {
        let { email, password, name } = req.body
        User.findOne(email ? { email } : { name }).then(user => {
            if (!user)
                return res.status(404).json({ email: "用户不存在!" })
            if (user.password) {
                if (!password) return res.status(400).json({ password: "密码错误!" })
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            let rule = { id: user.id, name: user.name, identity: user.identity, avatar: user.avatar }
                            jwt.sign(rule, config.secret, { expiresIn: 3600 }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                                if (err) {
                                    console.log(err)
                                }
                            })
                        } else {
                            res.status(400).json({ password: "密码错误!" })
                        }
                    })
            } else {
                let { name, _id, email } = user
                jwt.sign({ name, _id, email }, config.secret, { expiresIn: 3600 }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                    if (err) {
                        console.log(err)
                    }
                })
            }
        })
    })



    app.use(router);



}