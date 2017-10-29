import 'jquery';
import 'bootstrap';
import io from 'socket.io-client';
require('../src/client.scss');

const socket = io('http://localhost:8080');
const loadingHtml = '<div class="loading"><i class="fa fa-spin fa-spinner"></i></div>';

socket.on('connected', function (data) {
  console.log(data);
});

$(document).on('click', '#logIn', function(){
  var url = '/login';
  $('#modal').find('.modal-content').empty();
  $('#modal').modal('show').find('.modal-content').html(loadingHtml);
  $('#modal').modal('show').find('.modal-content').load(url);
});

$(document).on('click', '#submitLogin', function(){
  var form = $('#loginForm');
  var userName = form.find('#userName').val();
  if(!userName.length > 0){
    $(form).find('.form-control').addClass('has-error');
    return;
  }
  //TODO: Check server if name is available?
});

