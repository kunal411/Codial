const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new startegy for google login
passport.use(new googleStrategy({
        clientID: "359903220192-1p1sgddgsc4dje06jeq4rjoq8sns2op1.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('Error in google strategy passport', err);
                return;
            }
            console.log(profile);
            if(user){
                //if found set this user as req.user
                return done(null, user);
            }else{
                //if not found then create this user and set this user as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value, 
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log('Error in creating the user', err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;
