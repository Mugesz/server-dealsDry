
const express = require('express');
const mongoose = require('mongoose');
const User = require("../model/user")
var router = express.Router();
const URL = process.env.DB




mongoose.connect(URL, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


router.post('/api/users', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  //     try {
  //       const { name, email, mobileNo, designation, gender, course } = req.body;
  //       const imageFile = req.file; // Assuming you're using multer for file upload
  //       let imageUrl = '';
    
  //       if (imageFile) {
  //         const imageFileName = `${Date.now()}-${imageFile.originalname}`;
  //         const fileUpload = bucket.file(imageFileName);
    
  //         const blobStream = fileUpload.createWriteStream({
  //           metadata: {
  //             contentType: imageFile.mimetype
  //           }
  //         });
    
  //         blobStream.on('error', error => {
  //           console.error(error);
  //           res.status(500).json({ error: 'Failed to upload image' });
  //         });
    
  //         blobStream.on('finish', async () => {
  //           imageUrl = `https://storage.googleapis.com/${bucket.name}/${imageFileName}`;
    
  //           const newUser = new User({
  //             name,
  //             email,
  //             mobileNo,
  //             designation,
  //             gender,
  //             course,
  //             image: imageUrl
  //           });
    
  //           await newUser.save();
  //           res.json(newUser);
  //         });
    
  //         blobStream.end(imageFile.buffer);
  //       } else {
  //         const newUser = new User({
  //           name,
  //           email,
  //           mobileNo,
  //           designation,
  //           gender,
  //           course
  //         });
    
  //         await newUser.save();
  //         res.json(newUser);
  //       }
  //     } catch (err) {
  //       res.status(400).json({ error: err.message });
  //     }
  //   });
    
  
  // Read all users
  router.get('/api/getAll', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Read a single user
  router.get('/api/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: 'User not found' });
    }
  });
  
  // Update a user
  router.put('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, mobileNo, designation, gender, course, image } = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, mobileNo, designation, gender, course, image },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  
  
  // Delete a user
  router.delete('/api/users/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

  module.exports = router;