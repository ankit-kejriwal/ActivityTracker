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
        type: { type: String },
        coordinates: [Number],
    },
    os:{
        type:String
    },
    clickEvent : [ 
        {
           userId: mongoose.Schema.Types.ObjectId,
           tag : String,
           eventType : Number,
           timeStamp : Number
        }
    ],
    hoverEvent : [ 
        {
           tag : String,
           userid: mongoose.Schema.Types.ObjectId,
           timeStamp : Number
        }
    ]
})

const User  = module.exports =  mongoose.model('User',UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username,callback){
    const query  = {username:  username}
    User.findOne(query,callback);
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

module.exports.comparePassword =  function(cPassword, hash, callback){
    bcrypt.compare(cPassword,hash, (err, isMatch) =>{
        if(err) throw err;
        callback(null,isMatch);
    })
}