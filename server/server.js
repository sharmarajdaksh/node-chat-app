const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const { generateMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', (socket) => {
        console.log('A user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

module.exports = { app }