const express = require('express');
const path  =  require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config/database');


// Connecting to mongo database
mongoose.connect(config.database);
mongoose.connection.on('connected' , () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('connected', (err) => {
    console.log('Database error '+ err);
})

const app = express();

const users =  require('./routes/users');

const port =  3000;

app.use(cors());

app.use(bodyParser.json());


// setting path for the client side
app.use(express.static(path.join(__dirname, 'public')));

// added user route
app.use('/users',users); 


// Index Route
app.get('/', (req,res) => {
    res.send('invalid endpoint');
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});