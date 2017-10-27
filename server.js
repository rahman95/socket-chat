var express = require('express'),
app = express(),
server = require('http').Server(app),
io = require('socket.io')(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('connected', { success: true });
  socket.on('send', function (data) {
    console.log(data);
  });
});