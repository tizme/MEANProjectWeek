var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();
var http = require('http')
var server = http.createServer(app)
var io = require('socket.io').listen(server);

// // Session configuration
var sessionConfig = {
 secret:'CookieMonster', // Secret name for decoding secret and such
 resave:false, // Don't resave session if no changes were made
 saveUninitialized: true, // Don't save session if there was nothing initialized
 name:'myCookie', // Sets a custom cookie name
 cookie: {
  secure: false, // This need to be true, but only on HTTPS
  httpOnly:false, // Forces cookies to only be used over http
  maxAge: 360000000
 }
}

// Use session with our app
app.use(session(sessionConfig));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'bower_components')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

server.listen(8080);

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['General','News','Science','Politics','Movies','TV','Music','Video Games', 'Sports'];

io.sockets.on('connection', function (socket) {

    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function(username){
        // store the username in the socket session for this client
        socket.username = username;
        // store the room name in the socket session for this client
        socket.room = 'General';
        // add the client's username to the global list
        usernames[username] = username;
        // send client to room 1
        socket.join('General');
        // echo to client they've connected
        socket.emit('updatechat', 'SERVER', 'you have connected to General');
        // echo to room 1 that a person has connected to their room
        socket.broadcast.to('General').emit('updatechat', 'SERVER', username + ' has connected to this room');
        socket.emit('updaterooms', rooms, 'General');
    });

    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
        // we tell the client to execute 'updatechat' with 2 parameters
        io.sockets.in(socket.room).emit('updatechat', socket.username, data);
    });

    socket.on('switchRoom', function(newroom){
        socket.leave(socket.room);
        socket.join(newroom);
        socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
        // sent message to OLD room
        socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
        // update socket session room title
        socket.room = newroom;
        socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
        socket.emit('updaterooms', rooms, newroom);
    });


    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
        // remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        io.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });
});







//Break in case of sockets!!!!!!!!!!!!!!!!!
// var server = app.listen(8000, function() {
//  console.log("listening on port 8000");
// });
// this is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
// var io = require('socket.io').listen(server);
// Whenever a connection event happens (the connection event is built in) run the following code
// io.sockets.on('connection', function (socket) {
// 	console.log("WE ARE USING SOCKETS!");
// 	console.log(socket.id);
  //all the socket code goes in here!
  // If you don't know where this code is supposed to go reread the above info
// 	socket.on("button_clicked", function (data){
//     	console.log('Someone clicked a button!  Reason: ' + data.reason);
//     	socket.emit('server_response', {response: "sockets are the best!"});
// 	})
// })
