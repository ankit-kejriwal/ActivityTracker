const express = require("express");
const router = express.Router();
const passport =  require('passport');
const jwt =  require('jsonwebtoken');
const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.send("Inside route");
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
  res.send('Authenticate');
});


// Profile
router.get('/profile',(req,res,next) => {
  res.send('Profile');
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
