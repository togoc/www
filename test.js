module.exports = (app) => {
    //  测试: $router : /users/test
    app.get("/test", (req, res) => {
        res.send("ok test")
    })



    // const keyword = 'i' //从URL中传来的 keyword参数
    // const reg = new RegExp(keyword, 'i')


    // console.log(reg)




    // db.mallshop_catitems.find({
    //     image_src: {
    //         $regex: /icon_index_nav_2@2x\.png/ig
    //     }
    // })



}