const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    token:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
        
    },
    isUsed:{
        type: Boolean,
        trim: true,
        required: true
    },
    expiryDate:{
        type: Date,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim:true
    }
})

module.exports =  mongoose.model("Token", tokenSchema);
