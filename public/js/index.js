const socket = io();

socket.on('connect', function () {
    console.log('Connected to Server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
    const li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     message: 'Hi!'
// }, function (data) {
//     console.log('Got it', data);
// });

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User', 
        text: $('[name=message]').val()
    }, function () {

    });
});