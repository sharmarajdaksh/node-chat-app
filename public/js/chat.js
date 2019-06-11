const socket = io();

function scrollToBottom() {
    // Selectors
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child')
    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    const params = $.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {

    const formattedTime = moment(message.createdAt).format('HH:MM')
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    // console.log('New message', message);
    // const li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {

    const formattedTime = moment(message.createdAt).format('HH:MM')
    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    // const li = $('<li></li>');
    // const a = $('<a target="_blank">My current location</a>');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);

    // $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    const params = $.deparam(window.location.search);
    const formInput = $('[name=message]');

    socket.emit('createMessage', {
        from: params.name,
        text: formInput.val()
    }, function () {
        formInput.val('');
    });
});

const locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
})