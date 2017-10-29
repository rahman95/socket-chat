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

io.on('connection', function (socket) {
  socket.emit('connected', { success: true });
  socket.on('send', function (data) {
    console.log(data);
  });
});