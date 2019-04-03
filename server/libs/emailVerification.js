const User = require('../models/user').User;
const mongoose = require('./mongoose');
const nev = require('email-verification')(mongoose);
const config = require('../config');

nev.configure({
    verificationURL: config.get('url') + '/email-verification/${URL}',
    persistentUserModel: User,
    tempUserCollection: 'tempusers',
    expirationTime: 600,
    URLLength: 48,
    passwordFieldName: 'password',
 
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: config.get('gmail:user'),
            pass: config.get('gmail:password')
        }
    },
    verifyMailOptions: {
        from: `Photo blog <${config.get('gmail:user')}>`,
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    },
    confirmMailOptions: {
        from: `Photo blog <${config.get('gmail:user')}>`,
        subject: 'Successfully verified!',
        html: '<p>Your account has been successfully verified.</p>',
        text: 'Your account has been successfully verified.'
    },
}, function(err, options){
    if(err) console.log('email-verification error: ', err);
});

nev.generateTempUserModel(User, function(err, tempUserModel){
    if(err) console.log(err);
    console.log('Generated temp customer model: ' + (typeof tempUserModel === 'function'));
});

module.exports = nev;