/*jshint esversion: 6 */
const express             = require('express');
const app                 = express();

var mongoose               = require('mongoose');
var passport               = require('passport');
var bodyParser             = require('body-parser');
var User                   = require('./models/user.js');
var LocalStrategy          = require('passport-local');
var passportLocalMongoose  = require('passport-local-mongoose');
var formidable             = require('formidable');
var csv                    = require('csvtojson');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/oilbirt',{useMongoClient: true});

app.use(require("express-session")({
  secret: "adsib%^fiapbusd&%^$%f9p82938pbd98pb2%^deh98",
  resave: false,
  saveUninitialized: false
}));


app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('assets'));


//passport configuration
app.use(passport.initialize());
app.use(passport.session({extended: true}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.userConfig = JSON.stringify(req.user||{});
  next();
});

// Auth Routes
app.get('/', function (req, res) {
  res.redirect('/index/');
});

app.get('/secret', loggedIn, function (req, res) {
  res.render('secret');
});

//Handling User Sign Up
app.get('/register', function(req,res){
  res.render('register');
});

app.post('/register', function(req,res){
  var newUser = new User({username: req.body.username, name: req.body.name});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log("error creating new user:",err);
      res.redirect('/login');
    }
    else{
      passport.authenticate("local")(req,res,function(){
        res.redirect('/index/');
      });
    }
  });
});


app.get('/index*', function(req,res){
  res.render('index');
});

//Login
app.get('/login', function(req,res){
  if(req.isAuthenticated()){
    res.redirect('/index/');
  }
  else{
    res.render('login');
  }
});

app.post('/login', passport.authenticate("local",{
  successRedirect:"/index",
  failureRedirect:"/login"
}), function(req,res){

});

//logout
app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/login');
});

function loggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

function loggedOut(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

function apiAccess(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.send(401);
}

// -------------------------------------------------- //
// ---------------- API ROUTES ---------------------- //
// -------------------------------------------------- //

app.listen(9999, function () {
  console.log('Example app listening on port 9999!');
});

//Contacts
var contactsApi = require('./api/contacts.js');

app.get('/contacts/list', contactsApi.list);
app.post('/contacts/upload_csv', loggedIn, contactsApi.uploadCSV);

app.post('/contact/edit', contactsApi.editContact);
app.post('/contact/destroy', contactsApi.destroyContact);

//Lists
var listsApi = require('./api/lists.js');

app.post('/api/list', listsApi.newLists);
app.get('/api/lists', listsApi.getLists);
app.get('/api/list/:id', listsApi.getList);








