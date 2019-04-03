const User = require('../models/user').User;
const nev = require('../libs/emailVerification');
const bcrypt = require('bcrypt');
const saultRounds = 10;
const async = require('async');
const crypto = require('crypto');
const config = require('../config');
const emailService = require('../libs/nodemailer')();

module.exports.login = function(req, res){
    let email = req.body.login;
    let password = req.body.password;
    User.findOne({email: email}, (err, user) => {
        if(err) res.status(500).json({message: 'Ошибка базы данных'});
        if(user){
            if(bcrypt.compareSync(password, user.hashedPassword)){
                req.session.username = user.username;
                res.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username
                });
            }else{
                res.status(401).json({message: 'Неверный пароль'});
            }
         }else{
            res.status(401).json({message: 'Пользователь отсутствует'});
         } 
    });
}

module.exports.logout = function(req, res){
    delete req.session.username;
    res.status(200).json({});
}

module.exports.registration = function(req, res){
    if(Object.keys(req.body).length == 0) return res.status(500).json({message: 'Данные не отправлены'});
    let email = req.body.email;
    let username = req.body.username.toLowerCase();
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: username,
        email: email,
        hashedPassword: bcrypt.hashSync(req.body.password, saultRounds),
        created: new Date()
    });
    nev.createTempUser(user, function(err, existingPersistentUser, tempUser) {
        if (err) return res.status(500).json({message: 'Ошибка базы данных'});
        if (existingPersistentUser) return res.status(500).json({message: 'Вы уже зарегестрированы'});
        if (tempUser) {
            let url = tempUser[nev.options.URLFieldName];
            nev.sendVerificationEmail(email, url, function(err, info){
                if(err) return res.status(500).json({message: 'Ошибка верификации'});
                res.status(200).json({message: 'Сообщение выслано на email'}); 
            });
        } else {
            if(err) return res.status(500).json({message: 'Вы уже зарегестрированы'}) 
        }
    });
}

module.exports.verification = function(req, res){
    let url = req.params.URL;
    nev.confirmTempUser(url, function(err, user){
        if(err) return res.status(500).json({message: 'Ошибка верификации'});
        if(user){
            nev.sendConfirmationEmail(user.email, function(err, info){
                if(err) return res.status(500).json({message: 'Ошибка подтверждения email'});
                req.session.username = user.username;
                if(process.env.NODE_ENV == 'production'){
                    res.status(200).json({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username
                    });
                }else{
                    res.redirect(config.get('client'));
                }                
            });
        }else{
            res.status(500).json({message: 'Ошибка верификации'})
        }
    });
}

module.exports.passwordChange = function(req, res){
    async.waterfall([
        function(done){
            let token = crypto.randomBytes(20).toString('hex');
            done(null, token);
        },
        function(token, done){
            User.findOne({email: req.body.email}, function(err, user){
                if(err) done(err);
                if(!user) return res.status(404).json({message: 'Пользователь не найден'});
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;
                user.save(function(err){
                    done(err, token, user);
                });
            });
        },
        function(token, user, done){
            let body = '<p>Вы получили это сообщение, потому что Вы (или кто-то другой) запросили сброс пароля для вашей учетной записи.</p>' +
                       '<p>Пожалуйста, нажмите на следующую ссылку или вставьте это в свой браузер, чтобы завершить процесс:</p>' +
                       '<p>' + config.get('url') + '/reset/' + token + '</p>' +
                       '<p>Если вы не запрашивали это, пожалуйста, проигнорируйте это письмо, и ваш пароль останется без изменений.</p>';
            emailService.send(user.email, 'Смена пароля', body, function(err){
                if(err) done(err);
                done(null);
            });
            res.status(200).json({message: 'На вашу почту выслана инструкция'});
        }], function(err){
            if(err) return res.status(500).json({message: 'Произошла ошибка'});
        });
}

module.exports.passwordReset = function(req, res){
    let token = req.params.token;
    User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
        if(err) res.send('<h1>Произошла ошибка на стороне сервера</h1>');
        if(!user) res.send('<h1>Пользователь не найден</h1>');
        req.session.token = token;
        res.redirect(config.get('client') + '/#/setpass');
    });
}

module.exports.finalPasswordChange = function(req, res){
    async.waterfall([
        function(done){
            User.findOne({resetPasswordToken: req.session.token, resetPasswordExpires: {$gt: Date.now()}}, function(err, user){
                if(err) res.status(500).json({message: 'Произошла ошибка'});
                if(!user) res.status(404).json({message: 'Пользователь не найден'});
                user.hashedPassword = bcrypt.hashSync(req.body.password, saultRounds);
                delete req.session.token;
                user.save(function(err){
                    req.session.username = user.username;
                    done(err, user);
                })
            })    
        },
        function(user, done){
            let body = 'Это подтверждение того, что пароль для вашей учетной записи на сайте только что был изменен';
            emailService.send(user.email, 'Смена пароля', body, function(err){
                done(err);
            });
            res.status(200).json({message: 'Ваш пароль изминен'});
        }
    ], function(err){
        if(err) res.status(500).json({message: 'Произошла ошибка'});   
    });
}

module.exports.fbOrGoogleAuth = function(req, res){
    req.session.username = req.user.username;
    if(process.env.NODE_ENV == 'production'){
        res.status(200).json({
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            username: req.user.username
        });
    }else{
        res.redirect(config.get('client'));
    }   
}

module.exports.authError = function(req, res){
    res.status(401).json({message: 'Ошибка аутентификации'});
}

module.exports.checkAuth = function(req, res){
    let username;
    if(req.session.username) username = req.session.username;
    if(username){
        User.findOne({username: username}, function(err, user){
            if(err) return res.status(500).json({message: 'Ошибка базы данных'});
            if(user){
                res.status(200).json({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username
                });
            }
        });
    }else{
        res.status(204).json({});
    }
}