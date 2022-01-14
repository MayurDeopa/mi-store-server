const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String, required:true
    },
    password:{
        type:String, required:true
    },
    cart:[]
})

const User =  mongoose.model('user' , user)

module.exports = User;