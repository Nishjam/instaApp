const express = require("express");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const keys = require("../../config/keys");
const router = express.Router();

// @route   POST api/users/register
// @desc    Register new user
// @access  public
router.post("/register", (req, res) => {
    const {errors, isValid} =  validateRegisterInput(req.body);
   //Check validation
    if (!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user){
        errors.email = "Email already exists";
        return res.status(400).json(errors);
     } else {
        const avatar = gravatar.url(req.body.email, {
            s: "200",
            r: "pg",
            d: "mm"
          });
     const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
     });
        bcrypt.genSalt(20, (err,salt) => {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt ,(err,hash) =>{
                if (err) throw err;
                newUser.password = hash;
                newUser
                .save()
                .then( user => res.json(user))
                .catch( err => console.log(err));
            });
        });
          
      }
    })
    .catch( err => console.log(err));
});

// @route   POST api/users/login
// @desc    Login user / JWT Token returned
// @access  public

router.post("/login" ,(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //find user alreay exsist by email
    User.findOne({email})
    .then( user => {
        if(!user) {
        return res.status(404).json ({email:"User not found"})
        }
        //Checking Password
        bcrypt.compare(password,user.password).then(isMatch =>{
            if(isMatch) {
                //create payload
                const payload = {id: user.id,name: user.name, avatar:user.avatar};
                //sign token
                jwt.sign(
                    payload,
                    keys.secretOrKeys,
                    {expiresIn: 3600},
                    (err,token) => {
                        return res.json({
                            token:"Bearer" + token
                        });
                    }
                )
            }else{
                return res.status(400).json({ password: "Password incorrect!" });
            }
        });
    })
    .catch( err => console.log(err));
});

// @route   GET api/users/current
// @desc    Return current user
// @access  private

router.get("/current",
    passport.authenticate('jwt',{session:false}),
    (req, res) => {
        return res.json(req.user)
    }
);