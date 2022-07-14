const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Users = require('../DB/UserModel');
const {isNotLogin} = require('./middlewares/middlewares');

//get login route
router.get('/',isNotLogin, (req,res) => {
    res.render('login',{
        message:req.flash()
    });
});

//login route
router.post('/login',isNotLogin,passport.authenticate('local',{failureFlash: true, successRedirect : '/', failureRedirect:'/auth/'}));

//get register route
router.get('/register',isNotLogin, (req,res) => {
    res.render('register');
});

//post register route
router.post('/register',isNotLogin,async (req,res) => {
    const userData = {
        username:req.body.username,
        email:req.body.email,
        password: await bcrypt.hash(req.body.password, 10)
    };
    const userExist = await Users.findOne({email: userData.email});
    if(userExist){
        res.render('register',{
            status:false,
            message:"User already exist with email.",
            req:req.body
        });
        return;
    }
    const user = await Users.create(userData);
    if(!user){
        res.render('register',{
            status:false,
            message:"Something went wrong.",
            req:req.body
        });
        return;
    }
    res.redirect('/auth/');
});

//get route to reset password
router.get('/forgotpassword', isNotLogin, (req,res) => {
    res.render('forgotpassword');
});

//post route to reset password
router.post('/forgotpassword', isNotLogin, (req,res) => {
    res.render('forgotpassword');
});

//logout routes
router.get('/logout', (req,res) =>{
    req.logOut((err) => {if(err) console.log(err)});
    res.redirect('/');
});


module.exports = router;