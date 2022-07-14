const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./DB/UserModel');
const bcrypt = require('bcryptjs');
passport.serializeUser(function(user,done){
  done(null,user.id);
});

passport.deserializeUser(function(id,done){
  Users.findById(id, (err,user) => {
      done(err,user);
  })
});
passport.use('local', new LocalStrategy({
      usernameField:'email',
      passwordField:'password'
  },
  function(username, password, done) {
      Users.findOne({ email : username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false,{ message: "Invalid email." }); }
          bcrypt.compare(password, user.password, function(err,res){
          if (err)  return done(err);
          if (res == false) return done(null, false,{ message: "Incorrect password."});
          return done(null, user);
          });   
      });
  }
));