module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('socket is running');
        socket.on('refresh', data => {
            io.emit('refreshPage', {});
        });

    })
} 