module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('socket is running');
        socket.on('refresh', data => {
            io.emit('refreshPage', {});
        });
        socket.on('onEmployee', data => {
            io.emit('refreshEmployee', {});
        });
        socket.on('onUser', data => {
            io.emit('refreshUser', {});
        });
        socket.on('onBatch', data => {
            io.emit('refreshBatch', {});
        });
        socket.on('onInquiry', data => {
            io.emit('refreshInquiry', {});
        });
        socket.on('onAdmission', data => {
            io.emit('refreshAdmission', {});
        });
        socket.on('onStudent', data => {
            io.emit('refreshStudent', {});
        });
        socket.on('onNewEnlollment', data => {
            io.emit('refreshNewEnlollment', {});
        });
    })
} 