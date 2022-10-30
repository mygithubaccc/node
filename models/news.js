const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title:{
        type: String
    },
    content:{
        type: String
    },
    url:{
        type:String
    },
    newsImage:{
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    addedAt: {
        type: Date
    },
    campus: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('News',newsSchema);