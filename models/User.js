const mongoose = require('mongoose');
// const config = require('../models/')

const UserSchema = mongoose.Schema({
    name: {
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