const express = require("express")
const User = require("../db/db_user")
const router = express.Router()
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const config = require("../config")
    //加密
const bcrypt = require("bcryptjs")

//  测试: $router : /users/test
router.get("/test", (req, res) => {
    res.send("ok test")
})

//  注册: $router : /users/register
router.post("/register", (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: "邮箱已经被注册" })
        } else {
            let avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                identity: req.body.identity,
                password: req.body.password
            })
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if (err) throw err;
                    newUser.password = hash
                    newUser.save().then(re => res.status(200).json(re)).catch(err => console.log(err))
                    console.log(newUser)
                });
            });
        }
    })
})


//  登录: $router : /users/register
router.post("/login", (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if(!email||!password) return  res.status(404).json({message:'有空值'});
        //数据库匹配
    User.findOne({ email }).then(user => {
        if (!user)
            return res.status(404).json({ email: "用户不存在!" })
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const rule = { id: user.id, name: user.name, identity: user.identity, avatar: user.avatar }
                        // jwt.sign("规则", "加密名字", "过期时间", "箭头函数")
                    jwt.sign(rule, config.secret, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                            if (err) {
                                console.log(err)
                            }
                        })
                        // res.json({ msg: isMatch })
                } else {
                    res.status(400).json({ password: "密码错误!" })
                }
            })
    })
})



  

module.exports = router