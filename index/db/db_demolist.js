const mongoose = require("mongoose")

const Schema = mongoose.Schema

//创建集合
const demolist = Schema({
    title: String,
    main: String,
    link: String,
    pic: Array
})



module.exports = mongoose.model("index_demolists", demolist)

