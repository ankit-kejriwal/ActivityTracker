const mongoose = require('mongoose');
// const config = require('../models/')

const PageEventSchema = mongoose.Schema({
    pageEvent : [ 
        {   
           page : String,
           timeStamp : Number
        }
    ]   
})

const PageEvent  = module.exports =  mongoose.model('PageEvent',PageEventSchema);
