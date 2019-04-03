const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');
const User = require('../models/user').User;

passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err || !user) return done(err, null);
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: config.get('authProviders:google:clientID'),
    clientSecret: config.get('authProviders:google:clientSecret'),
    callbackURL: config.get('url') + "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       let email = profile.emails[0].value;
       User.findOne({ email: email}, function (err, user) {
           if(err) return done(err, null);
           if(user) return done(null, user);
           user = new User({
               firstName: profile.name.givenName,
               lastName: profile.name.familyName,
               username: (profile.name.familyName + '_' + profile.name.givenName).toLowerCase(),
               email: email,
               created: new Date()
           });
           user.save(function(err){
               if(err) return done(err, null);
               done(null, user);
           });
       });
  }
));

passport.use(new FacebookStrategy({
    clientID: config.get('authProviders:facebook:appId'),
    clientSecret: config.get('authProviders:facebook:appSecret'),
    callbackURL: "/auth/facebook/callback",
    profileFields: ['emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
      console.log('1: ', profile);
      let email = profile.emails[0].value;
      User.findOne({email: email}, function(err, user){
        if(err) return done(err, null);
        if(user) return done(null, user);
        user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: (profile.name.familyName + '_' + profile.name.givenName).toLowerCase(),
            email: email,
            created: new Date()   
        });
        user.save(function(err){
            if(err) return done(err, null);
            done(null, user);
        });
      });
  }
));

module.exports = passport;