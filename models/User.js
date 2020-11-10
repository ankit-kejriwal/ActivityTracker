const mongoose = require('mongoose');
// const config = require('../models/')
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    created_date: { type: Date, default: Date.now },
    location: {
        type: String
    },
    os:{
        type:String
    },
    clickEvent : [ 
        {
           tag : String,
           clickType : Number,
           timeStamp : Number
        }
    ],
    hoverEvent : [ 
        {
           tag : String,
           timeStamp : Number
        }
    ],
    pageEvent : [ 
        {
           page : String,
           timeStamp : Number
        }
    ]   
})

const User  = module.exports =  mongoose.model('User',UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt, (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}