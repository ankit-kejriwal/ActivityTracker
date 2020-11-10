const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res, next) => {
  res.send("Inside route");
});


// Register
router.get('/register',(req,res,next) => {
  res.send('Register');
});


// Authenticate
router.post('/authenticate',(req,res,next) => {
  res.send('Authenticate');
});


// Profile
router.get('/profile',(req,res,next) => {
  res.send('Profile');
});


// Validate
router.get('/validate',(req,res,next) => {
  res.send('Validate');
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
