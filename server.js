const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./src/mongooseInterface');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var isAuthenticated = false;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/db').then(function() {
   console.log('Connected');
});
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    isAuthenticated = false;
   res.sendFile(path.join(__dirname, 'public/login.html'));
});
app.get('/welcome', function(req, res) {
    if (isAuthenticated) {
        res.sendFile(path.join(__dirname, 'src/welcome.html'));
    }
    else {
        res.send('<h5>You are not authenticated to access the file</h5>');
    }
});
app.post('/signup', function(req, res) {
    var bool = checkFormData(req.body);
    if (bool) {
        const promise =  User.findOne({username: req.body.username});
        const promise2 = User.findOne({email: req.body.email});
        Promise.all([promise, promise2]).then(function(values) {
            if (!values[0] && !values[1]) {
                User.signup(req, res);
            }
            else {
                res.send({Error: 'User already exist'});
            }
        });
    }
    else {
        res.send({Error: 'Please fill all the fields'});
    }
});
app.post('/login', function(req, res) {
  const promise =  User.findOne({username: req.body.username});
  promise.then(function(user) {
      if (!user) {
          res.send({Error: 'No such user exist'});
          return;
      }
      if (user.password === req.body.password) {
          isAuthenticated = true;
          res.sendFile(path.join(__dirname, 'src/welcome.html'));
      }
      else {
          res.send({Error: 'Incorrect Password'});
      }

  })
});

function checkFormData(obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (obj[property] === '')
                return false;
        }
    }
    return true;
}
app.listen(8080, function () {
   console.log('App ready and Listening on http://localhost:8080');
});
