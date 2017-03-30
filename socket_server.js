var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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

// app.listen(8000, function(){
// 	console.log("Server is up and running")
// })

//Break in case of sockets!!!!!!!!!!!!!!!!!
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

io.on('connection', function(socket){
  console.log('a user connected');
//Connections
    socket.on('get-users', function() {
        socket.emit('all-users', users);
    });

  //new user
  socket.on('join', function(data){
      console.log(data);
      console.log(users);
      //User name
      socket.nickname = data.nickname;
      users[socket.nickname] = socket; 
      var userObj = {
        nickname: data.nickname,
        socketid: socket.id
    };

    users.push(userObj);
    io.emit('all-users', users);
  });

  socket.on('send-message', function(data) {
      //socket.broadcast.emit('message-received', data);
      io.emit('message-received', data);
  });

  socket.on('send-like', function(data){
      console.log(data);
      socket.broadcast.to(data.like).emit('user-liked',data);
  });

 socket.on('disconnect', function(){
    // console.log('user disconnected', function() {
        users = users.filter(function(item) {
            return item.nickname !== socket.nickname;
        });
        io.emit('all-users', users);
  });

});



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
