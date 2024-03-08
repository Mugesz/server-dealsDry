const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const Auth = require("../model/auth");
require("dotenv").config();
const URL = process.env.DB


mongoose.connect(URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const user = await Auth.create(req.body);
    res.json({ message: "user created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle error and send response
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Auth.findOne({ email: req.body.email });
    if(user){
      const passwordMatch = await bcrypt.compareSync(req.body.password, user.password); 
      if(passwordMatch){
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        res.json({ message: "login successful", token });
      } else {
        res.status(400).json({ error: "Invalid password" }); // Handle invalid password
      }
    } else {
      res.status(400).json({ error: "User not found" }); // Handle user not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle error and send response
  }
});

module.exports = router;
