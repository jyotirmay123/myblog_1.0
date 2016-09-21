'use strict';

var pmx = require('pmx').init({
  http          : true, // HTTP routes logging (default: true)
  ignore_routes : [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors        : true, // Exceptions loggin (default: true)
  custom_probes : true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network       : true, // Network monitoring at the application level
  ports         : true  // Shows which ports your app is listening on (default: false)
});

var express = require('express');
var compress = require('compression');
var favicon = require('serve-favicon');
//var cluster = require('cluster');
var path = require('path');

var app = express();
app.use(compress());
app.use(favicon(path.join(__dirname, 'utils', 'myblog.ico')));
app.use(express.static(__dirname + "/myblogUI/"));
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});




