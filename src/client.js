import 'jquery';
import 'bootstrap';
import io from 'socket.io-client';
require('../src/client.scss');

const socket = io('http://localhost:8080');
const loadingHtml = '<div class="loading"><i class="fa fa-spin fa-spinner"></i></div>';

socket.on('connected', function (data) {
  console.log(data);
});

$('#logIn').click(function(){
  var url = '/login';
  $('#modal').find('.modal-content').empty();
  $('#modal').modal('show').find('.modal-content').html(loadingHtml);
  $('#modal').modal('show').find('.modal-content').load(url);
});