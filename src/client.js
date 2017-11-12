import 'jquery';
import 'bootstrap';
import io from 'socket.io-client';
require('../src/client.scss');

const socket = io('http://localhost:8080');
const loadingHtml = '<div class="loading"><i class="fa fa-spin fa-spinner"></i></div>';
var userName;

socket.on('connected', function (data) {
  console.log(data);
});

socket.on('userJoined', function (data) {
  updateUserCount(data.userCount);
});

socket.on('BroadcastMessage', function (data) {
  addMessage(data.user, data.message, 'to');
});

$(document).on('click', '#logIn', function(){
  var url = '/login';
  $('#modal').find('.modal-content').empty();
  $('#modal').modal('show').find('.modal-content').html(loadingHtml);
  $('#modal').modal('show').find('.modal-content').load(url);
});

$(document).on('click', '#submitLogin', function(){
  var form = $('#loginForm');
  var user = form.find('#userName').val();
  if(!user.length > 0){
    $(form).find('.form-control').addClass('has-error');
    return;
  }
  socket.emit('checkLogin', user);
  socket.on('userConnected', function(data){
    
    if(data.success){
      //successfully logged in
      $('#modal').modal('hide');
      userName = data.userName;
      activateInputs(data.userName);
      updateUserCount(data.userCount);
      updateRoomCount(data.roomCount);
    }else{
      //an error occured
      $('#messageLog').html(data.error).removeClass('alert-info').addClass('alert-danger');
    }
  });
});

//send
$(document).on('click', '#sendButton', function(){
  var message = $('#messageBox').val();
  if(!message.length > 0){
    return;
  }
  addMessage(userName, message, 'from');
  socket.emit('sendMessage', {
    user: userName,
    message: message
  });
  $('#messageBox').val('');
});

function addMessage(user, message, origin){
  var chatHistory = $('#chatHistory');
  var newMessage = document.createElement('div');
  newMessage.classList.add('message');
  newMessage.classList.add(origin);
  newMessage.innerHTML= message;
  chatHistory.append(newMessage);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function activateInputs(userName){
  $('#chatHistory').removeAttr('disabled');
  $('#roomList').removeAttr('disabled');
  $('#messageBox').removeAttr('disabled');
  $('#sendButton').removeClass('disabled');
  $('#logIn').html('Log-off').removeClass('btn-success').addClass('btn-danger');
  $('#loggedinUser').html(userName);
  $('#loginAlert').hide();
}

function updateRoomCount(count){
  $('#roomCount').html(count);
}

function updateUserCount(count){
  $('#userCount').html(count);
}

