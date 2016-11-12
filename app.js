/**
*@author :: Jyotirmay
*@Date :: 25th Sep, 2016
*/

var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var CryptoJS = require("crypto-js");

//var stacktrace = require("stacktrace");

var health = require('express-ping');

// Mongoo DB config File..
var config = require("./config");

// My Blog apis
var NodeIndexRoute = require('./routes/NodeIndexRoute');
var NodeBlogRoute = require('./routes/NodeBlogRoute');
var NodeLoginRoute = require('./routes/NodeLoginRoute');
var NodeUserRoute = require('./routes/NodeUserRoute');
var NodeTKRoute = require('./routes/NodeTKRoute');


//logger config
var log4js = require('log4js');
var date = new Date();
var curr_date = date.getDate();
var curr_month = date.getMonth() + 1;
var curr_year = date.getFullYear();
var formattedDate = curr_date + '-' + curr_month + '-' + curr_year;

//log the app logger messages to a file, and the console ones as well.
log4js.configure({
  appenders: [
    {
      type: "file",
      filename: "logs/MyBlog_" + formattedDate + ".log",
      maxLogSize: 2048000,
      backups: 3,
      category: ['MyBlog'],
      layout: {
        type: 'pattern',
        pattern: "[%r] [%[%5.5p%]] - %m%n"
      }
    },
    {
      type: "console",
      layout: {
        type: 'pattern',
        pattern: "[%r] [%[%5.5p%]] - %m%n"
      }
    }
  ],
  replaceConsole: true
});
// Creating global logger object
var log = log4js.getLogger('MyBlog');
log.setLevel('ALL');

//for more details on log4js >> https://github.com/nomiddlename/log4js-node/wiki/Layouts

//Conect to DB
mongoose.connect(config.mongoUri, function (err) {
  if (!err) {
    log.info("Connected to Database.");
    log.info("*** Welcome to MyBlog ***");
  } else {
    log.error(err);
  }
});

//var elasticsearch = require('elasticsearch');
//var client = new elasticsearch.Client({
//  host: <"http://172.17.16.221:9200">,
//  log: 'trace'
//});
/*client.ping({
  // ping usually has a 3000ms timeout 
  requestTimeout: Infinity,
 
  // undocumented params are appended to the query string 
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
client.search({
  q: '*'
}).then(function (body) {
  var hits = body.hits.hits;
}, function (error) {
  console.trace(error.message);
});

client.search({
  index: 'users',
  type: 'user',
  body: {
    query: {
      match: {
        firstName: 'Rasheed'
      }
    }
  }
}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});*/

//Creating global AP app
var app = express();

var corsOptions = {
  origin: true,
  methods: 'GET,PUT,POST,DELETE',
  maxAge: 1728000
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


// qc routing
app.use('/', NodeIndexRoute);
app.use('/blog', NodeBlogRoute);
app.use('/login', NodeLoginRoute);
app.use('/user', NodeUserRoute);
app.use('/tk', NodeTKRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/*app.onerror = function(msg, file, line, col, error) {
    // callback is called with an Array[StackFrame]
    var callback = function (err) {
      console.log(err);
    }
    var errback = function (err) {
      console.log(err);
    }
    stacktrace.fromError(error).then(callback).catch(errback);
};*/

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.set('superSecret', config.secret);
app.set('logObject', log);

module.exports = app;
