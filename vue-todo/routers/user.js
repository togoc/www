const express = require('express');
const gravatar = require('gravatar')
const User = require('../../passport/db_user')
const router = express.Router()
module.exports = app => {

    router.get('/test', (req, res) => {
        res.send("ok");
    });
    router.post('/login', (req, res) => {
        User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                return res.status(200).json(user)
            } else {
                console.log(req.body.email)
                let avatar = gravatar.url(req.body.email, { size: '200', rating: 'pg', default: 'mm' });
                let newUser = new User({
                    email: req.body.email,
                    avatar,
                })
                newUser.save().then(re => res.status(200).json(re)).catch(err => console.log(err))
            }
        })
    });


    // router.post("/login", (req, res) => {
    //     console.log("login:", req.body)
    //     let email = req.body.email
    //         //数据库匹配
    //     User.findOne({ email }).then(user => {
    //         if (!user){


    //             return res.status(404).json({ email: "用户不存在!" })
    //         }
    //         res.status(200).json(user)
    //     })
    // })








    app.use("/todos/user", router);

}