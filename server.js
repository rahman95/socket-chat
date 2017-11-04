var express = require('express'),
app = express(),
server = require('http').Server(app),
io = require('socket.io')(server);

app.use(express.static(__dirname));
server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/views/login.html');
});

var users = [];
var rooms = [];

io.on('connection', function (socket) {
  // On Connect
  socket.emit('connected', {
     success: true 
  });

  //On Login name check
  socket.on('checkLogin', function (user) {
    if(!checkUserName){
      console.log('new user joined');
      users.push({'name': user});
      socket.emit('userConnected', {
        success: true,
        userName: user,
      });
      socket.broadcast.emit('userJoined', {
        userName: user,
        userCount: Object.keys(users).length
      });
    }else{
      console.log('username already exists');
      socket.emit('userConnected', {
        success: false,
        error: 'Name ' + user + ' already exists, please try another.',
      });
    }
  });

  //On Receive

  //On Send
  socket.on('send', function (data) {
    console.log(data);
  });
});

function checkUserName(userName)
{
  var nameExists = false;

  for (index in users) {
    if(users[index].name == userName){
      nameExists = true;
    }
  }

  return nameExists;
}