// set up ======================================================================
var express   = require('express');
var app       = express();
var http      = require('http');
var path      = require('path');
var config    = require('./config');
var log       = require('./app/lib/log')(module);
var HttpError = require('./app/error').HttpError;
var mongoose  = require('./app/lib/mongoose');



// configuration ===============================================================

app.configure(function() {
  app.use(express.favicon());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.logger(app.get('env') == 'development' ? 'dev' : 'default'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(function(err, req, res, next) {
    err = new HttpError(500);
    res.sendHttpError(err);
  });
});

// routes ======================================================================
require('./app/routes')(app);

// listen (start app with node server.js) ======================================
var server = http.createServer(app);
server.listen(config.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});

//var io = require('./socket')(server);
//app.set('io', io);