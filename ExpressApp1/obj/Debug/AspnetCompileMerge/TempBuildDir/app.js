﻿
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

exports.index = function (req, res) {
    res.render('index', { title: 'Knights of the Slightly-Oval Table' });
};


var serve = http.createServer(app);
var io = require('socket.io')(serve);

serve.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.broadcast.emit('chat', "--A User has Connected--");
    socket.on('disconnect', function () {
        console.log('user disconnected');
        socket.broadcast.emit('chat', "--A User has Disconnected--");
    });
    socket.on('chat', function (msg) {
        socket.broadcast.emit('chat', msg);
    });
});






