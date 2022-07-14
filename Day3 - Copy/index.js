require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path=require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const app = express();

//making connection
mongoose.connect(process.env.URI);

//setting up views
app.set('views', './Views');
app.set('view engine','ejs');
//setting up session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.URI,
        collectionName: 'session'
    }),
    cookie: { maxAge: 24*60*60*1000 }
  }));
//relative path for public folders
app.use(express.static(path.join(__dirname,'public')));
//request from form
app.use(express.urlencoded({extended:true}));
//for reuest as json
app.use(express.json());

//setting up passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./passportlocal');


app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next(); 
});
//setting up routes 
app.use('/', 
require('./Routers/home'));
app.use('/sendfile', 
require('./Routers/SendFile'));
app.use('/auth', 
require('./Routers/AuthRoutes'));
/*app.use('/user',
passport.authenticate('jwt',{session:false}), 
require('./Routers/UsersData'));*/

app.listen(process.env.PORT | 5000, () => {
    console.log("Up and running "+process.env.PORT);
});