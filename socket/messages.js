module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('socket is running');
        socket.on('send-data-to-drivers', data => {
            // io.emit('refreshPage', {});
            console.log('socket is listening to send-data-to-drivers');
            console.log(data);
        });
    })
} 