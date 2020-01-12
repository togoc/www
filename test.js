module.exports = (app) => {
    //  测试: $router : /users/test
    app.get("/test", (req, res) => {
        res.send("ok test")
    })







}