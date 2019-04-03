const express = require('express');
const app = express();
const http = require('http');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const {login, logout, registration, verification, passwordChange, 
       passwordReset, finalPasswordChange, fbOrGoogleAuth, authError, checkAuth} = require('./routes/auth');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const session = expressSession({
    resave: false,
    saveUninitialized: false,
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: {maxAge: 1000*6*60*24*7*2},
    store: new MongoStore({url: config.get('mongoose:uri')})
});
const passport = require('./libs/passport');
const photoDir = __dirname + '/public';
const photoLoading = require('./routes/photo').loadPhoto(photoDir);
const loadUserpic = require('./routes/photo').loadUserpic(photoDir);
const {getAllPhoto, getUserPhoto, addLike, deleteLike, addComment, getUserData} = require('./routes/photo');
const {checkSession} = require('./middleware/checkSession')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV != 'production'){
    const corsOptions = {
        origin: config.get('client'),
        credentials: true,
        methods: "GET, POST, DELETE, PUT, OPTIONS",
        allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, authorization, X-Usertext"
      }
    app.use(cors(corsOptions));
}

app.get('/', function(req, res){
    res.sendfile('/public/index.html');
});
// AAA ------------------------------------------------------
app.post('/registration', registration);
app.get('/email-verification/:URL', verification);
app.post('/login', login);

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }));
app.get('/auth/google/callback', passport.authenticate( 'google', { successRedirect: '/auth/success', failureRedirect: '/auth/failure' }));
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/success', failureRedirect: '/auth/failure' }));
app.get('/auth/success', fbOrGoogleAuth);
app.get('/auth/failure', authError);

app.post('/logout', logout);
app.post('/sendemail', passwordChange);
app.get('/reset/:token', passwordReset);
app.post('/passwordchange', finalPasswordChange);
app.get('/checkauth', checkAuth);
// photo ----------------------------------------------------
app.post('/sendphoto', checkSession, photoLoading);
app.post('/senduserpic', checkSession, loadUserpic);
app.get('/getallphoto', checkSession, getAllPhoto);
app.get('/getuserdata/:username', checkSession, getUserData);
app.get('/getuserphoto/:username', checkSession, getUserPhoto);
app.post('/addlike', checkSession, addLike);
app.post('/addcomment', checkSession, addComment);
app.post('/deletelike', checkSession, deleteLike);

app.use(function(req, res){
    res.status(404).end('<h1>#404</h1><p>page not found</p>');
});

http.createServer(app).listen(config.get('port'), () => console.log('Server started on port: ', config.get('port')));