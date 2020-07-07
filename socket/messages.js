module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('socket is running');
        socket.on('send-data-to-drivers', data => {

            data.forEach(driver => {
                io.emit(driver.id, driver);
            });
            // io.emit('refreshPage', {});
            console.log('socket is listening to send-data-to-drivers');
            console.log(data);


        });

      
    })
} 