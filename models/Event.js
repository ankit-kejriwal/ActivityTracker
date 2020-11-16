const mongoose = require('mongoose');
// const config = require('../models/')

const EventSchema = mongoose.Schema({
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
    ]   
})

const Event  = module.exports =  mongoose.model('Event',EventSchema);
