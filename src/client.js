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
  socket.emit('checkLogin', userName);
  socket.on('userConnected', function(data){
    
    if(data.success){
      //successfully logged in
      $('#modal').modal('hide');
      activateInputs(data.userName);
    }else{
      //an error occured
      $('#messageLog').html(data.error).removeClass('alert-info').addClass('alert-danger');
    }
  });
});

function activateInputs(userName){
  $('#chatHistory').removeAttr('disabled');
  $('#roomList').removeAttr('disabled');
  $('#userList').removeAttr('disabled');
  $('#messageBox').removeAttr('disabled');
  $('.sendButton').removeAttr('disabled');
  $('#logIn').html('Log-off').removeClass('btn-success').addClass('btn-danger');
  $('#loggedinUser').html(userName);
  $('#loginAlert').hide();
}

