const express = require("express");
const router = express.Router();
const passport =  require('passport');
const jwt =  require('jsonwebtoken');
const config = require('../config/database')
const User = require("../models/User");
const Event = require("../models/Event");

// router.get("/", (req, res, next) => {
//   res.send("Inside route");
// });

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});


// Register
router.post('/register',(req,res,next) => {
  let newUser  = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    created_at: Date.now(),
    location:req.body.location || ' ',
    os: req.body.os  || ' '
  });

  User.addUser(newUser,(err,user) => {
    if(err){
      res.json({ success: false, msg: "Failed to register user" });
    } else {
      res.json({ success: true, msg: "user Registered" });
    }
  })
});


// Authenticate
router.post('/authenticate',(req,res,next) => {
  const username  = req.body.username;
  const password  = req.body.password;
  
  User.getUserByUsername(username,(err,user) => {
    if(err) throw err;
    if(!user) 
      return res.send({success: false, msg:'User not found'})

    User.comparePassword(password,user.password,(err,isMatch)=> {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(),config.secret,{
          expiresIn: 604800
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user:{
            id:user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.send({success: false, msg:'wrong password'})
      }
    })
});
});


// Profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next) => {
  res.send({user: req.user});
});

// add event

// Register
router.post('/addevent/:id',(req,res,next) => {
  console.log(req.body);

  console.log(req.params.id);
  options = { upsert: true, new: true, setDefaultsOnInsert: true };
  Event.findByIdAndUpdate(req.params.id, 
    { $addToSet: { clickEvent: { $each:req.body.eventObj  } } }, options,
     function (err, post) {
    if (err) return next(err);
    console.log('click added to db');
    res.json(post);
  });
});


/**
 * Post api to store the user info to the database
 * @req {{ name: string, os: string, created_date: Date, location: string }}
 */

router.post("/", function (req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) res.json({ success: false, msg: "Failed to register user" });
    res.json(user);
  });
});

/**
 * Get Api to retrieve particular user information
 * @req {{ id: Objectid }}
 */

router.get("/:id", function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.json({ success: false, msg: "Failed to find a user" });
    res.json(user);
  });
});

module.exports = router;
