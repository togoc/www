const mongoose = require('mongoose')

const Schema = mongoose.Schema


const collections = Schema({
    keyword: String,
    main: String,
    git: String,
    source: String,
    
    data: {
        type: Number,
        default: Date.now()
    }
})

module.exports = mongoose.model('search_lists', collections)