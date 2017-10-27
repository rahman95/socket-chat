import 'jquery';
import 'bootstrap';

var socket = io.connect('http://localhost:8080');
socket.on('connected', function (data) {
  console.log(data);
});