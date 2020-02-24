const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Image model
const Images = require('../../models/Image');
// Load User Model
const User = require('../../models/User');
//Load Profile Model
const Profile = require('../../models/Profile')

// Load Validation
const validateURI = require('../../validation/uri')


// @route   GET api/image/:id
// @desc    Get image by id
// @access  Public
router.get('/:id', (req, res) => {
  Image.findById(req.params.id)
    .then(image => res.json(image))
    .catch(err =>
      res.status(404).json({ noimagefound: 'No images found for that ID' })
    );
});

//Validate  URI
// @route   POST api/images
// @desc    Create image data
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateURI(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
  
      const newImage = new Image({
        user: req.user.id,
        uri: req.body.uri,
        description: req.body.description,
        name: req.body.name,
        avatar: req.body.avatar,
      });
  
      newImage.save().then(image => res.json(image));
    }
  );

// @route   Post api/images/like/:id
// @desc    Like image
// @access  Private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
        Image.findById(req.params.id)
          .then(image => {
            if (
              image.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: 'User already liked this post' });
            }
  
            // Add user id to likes array
            image.likes.unshift({ user: req.user.id });
  
            image.save().then(image => res.json(image));
          })
          .catch(err => res.status(404).json({ imagenotfound: 'No image found' }));
      });
    }
  );
  module.exports = router;