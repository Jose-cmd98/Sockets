
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Usuário Conectado. ');

    socket.on('disconnect', () => {
        console.log('Desconectado. ');
    })
})

http.listen(3000, () => {
    console.log('Listening on *:3000');
});

