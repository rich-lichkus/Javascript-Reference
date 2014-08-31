//app.js

// var databaseUrl = "wordsdb"; // "username:password@example.com/mydb"
// var collections = ["wordsdb"];
// var db = require("mongojs").connect(databaseUrl, collections);

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var routes = require('./routes/index');
var users = require('./routes/users');
var words = require('./routes/wordrank');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/wordrank', words);

// This directives are telling Express what route files to use. 
// Now, normally I'd advocate setting up separate route files for different parts of your app. 
// For example, the users route file might contain routes for adding users, deleting them, 
// updating them, and so forth, while a new route file called "locations" might handle adding,
// editing, deleting and displaying location data (in an app for which that was required).
// In this case, to keep things simple, we're going to do everything in the index router.
// That means you can completely ignore the /users line.

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
