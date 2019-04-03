const fs = require('fs');
const Photo = require('../models/photo').Photo;
const User = require('../models/user').User;
const {getFileFromHttp} = require('../libs/getFile');
var parseHttpHeader = require('parse-http-header');
const JSONStream = require('JSONStream');

const randomString = function(length = 6){
    let text = '';
    const alphabet = "abcdefghijklmnopqrstuvwxyz";  
    for (let i = 0; i < length; i++){
        text += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return text;
}

const createDir = function(username, dir){
    return new Promise((resolve) => {
        let newDir = dir + '/' + username;
        fs.existsSync(newDir) || fs.mkdirSync(newDir); 
        resolve(newDir);
    })
}

const savePhoto = function(path, newDir, username, description){
    if(typeof username !== 'string' || !username || !path || !description) reject(serverError());
    let now = new Date();
    let newPath = '/' + randomString() + now.getFullYear() + now.getMonth() + now.getDay() + '_' + 
                  now.getHours() + now.getMinutes() + now.getSeconds() + '.jpg';
    fs.renameSync(path, newDir + newPath);
    new Promise((resolve, reject) => {
        let photo = new Photo({
            username: username,
            imagePath: '/' + username + newPath,
            description: description,
            likes: {
                users: [],
                count: 0
            },
            comments: [],
            loaded: new Date()
        });
        photo.save(err => {
            if(err) reject(dbError());
            return resolve();
        });
    });
}

module.exports.loadPhoto = dir => function(req, res){
    let username = req.session.username;
    let text = decodeURIComponent(parseHttpHeader(req.headers['x-usertext'])['0']);
    Promise.all([getFileFromHttp(req, dir), createDir(username, dir)])
        .then(data => savePhoto(data[0], data[1], username, text))
        .then(() => res.redirect('/getallphoto'))
        .catch(err => res.status(500).json({message: err.message}));
}

const dbError = () => new Error("Ошибка базы данных");

const serverError = () => new Error("Ошибка обработки данных");

module.exports.loadUserpic = dir => function(req, res){
    let username = req.session.username;
    Promise.all([getFileFromHttp(req, dir), createDir(username, dir)])
        .then(data => {
            let newPath = '/userpic.jpg';
            fs.renameSync(data[0], data[1] + newPath);
            res.status(200).json({})
        })
        .catch(err => res.status(500).json({message: err.message}));
}

const getPhotoDate = function(id){
    return new Promise((resolve, reject) => {
        Photo.findOne({_id: id}, {loaded: 1}, (err, photo) => {
            if(err) reject(dbError());
            resolve(photo.loaded);
        });
    });
}

module.exports.getAllPhoto = function(req, res){
    const limit = 7;
    let id = req.query.id ? req.query.id : null;
    if(id){
        getPhotoDate(id)
            .then(date => {
                Photo.find({loaded: {$lt: date}}).sort({loaded: -1}).limit(limit).exec((err, photo) => {
                    if(err) reject(dbError());
                    res.status(200).json(photo);
                });
            })
            .catch(err => res.status(500).json({message: err.message}));
    }else{
        Photo.find({}).sort({loaded: -1}).limit(limit).exec((err, photo) => {
            if(err) res.status(500).json({message: 'error'});
            res.status(200).json(photo);
        });
    }
}

const getUserDataFromDb = function(username){
    return new Promise((resolve, reject) => {
        User.findOne({username: username}, {firstName: 1, lastName: 1, username: 1}, (err, user) => {
            if(err) return reject(new Error("Ошибка базы данных"));
            let userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            };
            resolve(userData);
        });
    });
}

module.exports.getUserData = function(req, res){
    let username = req.params.username;
    getUserDataFromDb(username)
        .then(userData => res.status(200).json(userData))
        .catch(err => res.status(500).json({message: err.message}))
}

module.exports.getUserPhoto = function(req, res){
        let username = req.params.username;
        Photo.find({username: username}).sort({loaded: -1}).cursor()
            .pipe(JSONStream.stringify())
            .pipe(res.status(200))
            .on('end', () => res.end())
            .on('error', () => res.status(500).json({message: 'Ошибка базы данных'}));
}

module.exports.addLike = function(req, res){
        Photo.updateOne({imagePath: req.body.path}, {$inc: {"likes.count": 1}, $addToSet: {"likes.users": req.body.username}}, function(err){
            if(err) return res.status(500).json({message: 'Ошибка базы данных'});
            res.status(200).end();
        });
}

module.exports.deleteLike = function(req, res){
        Photo.updateOne({imagePath: req.body.path}, {$inc: {"likes.count": -1}, $pull: {"likes.users": req.body.username}}, function(err){
            if(err) return res.status(500).json({message: 'Ошибка базы данных'});
            res.status(200).end();
        });
}

module.exports.addComment = function(req, res){
        Photo.updateOne({imagePath: req.body.path}, {$push: {comments: req.body.comment}}, function(err){
            if(err) return res.status(500).json({message: 'Ошибка базы данных'});
            res.status(200).end();
        });
}