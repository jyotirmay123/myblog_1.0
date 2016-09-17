'use strict';

var express = require('express');
var compress = require('compression');
var favicon = require('serve-favicon');
//var cluster = require('cluster');
var path = require('path');

var app = express();
app.use(compress());
app.use(favicon(path.join(__dirname, 'public', 'utils', 'myblog.ico')));
app.use(express.static(__dirname + "/public/build"));
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});




