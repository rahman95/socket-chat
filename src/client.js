import 'jquery';
import 'bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');
socket.on('connected', function (data) {
  console.log(data);
});