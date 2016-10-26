var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');

var port = process.env.PORT;
var dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
// logging
app.use(morgan('dev'));
/*app.use(function(req, res, next) {
	console.log('' + req.method + ': ' + req.originalUrl);
	next();
});*/
// fix for 304
app.disable('etag');

// configure our routes
require('./app/routes')(app);

app.listen(port)
console.log('Server started on port' + port);

// expose app
exports = module.exports = app;
