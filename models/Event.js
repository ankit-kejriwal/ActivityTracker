const mongoose = require('mongoose');
// const config = require('../models/')

const EventSchema = mongoose.Schema({
    userid: mongoose.Schema.Types.ObjectId,
    clickEvent : [ 
        {
           userid: mongoose.Schema.Types.ObjectId,
           tag : String,
           clickType : Number,
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

const Event  = module.exports =  mongoose.model('Event',EventSchema);
