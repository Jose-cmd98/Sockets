const { Socket } = require('socket.io');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


var usuarios = [];//array de usuarios
var socketIds = [];//validade no backend


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => { //ioConnection

    socket.on('new user', (data) => { //data >nome
        if(usuarios.indexOf(data) != -1){ //indexOf retorna o valor != -1
            socket.emit('new user', {sucess:false}); //caso indexOf retorne o valor == false
        }else{
            usuarios.push(data);
            socketIds.push(socket.id);

            socket.emit('new user',{sucess: true});
        }
    })

    socket.on('chat message', (obj) => { //se o nome do front ja existe no array error
        if(usuarios.indexOf(obj.nome) != -1 && usuarios.indexOf(obj.nome) == socketIds.indexOf(socket.id)){ //socket usado como segunda validação de segurança
            io.emit('chat message', obj);
        }else{
            console.log('Erro: Você não tem permissão para executar essa ação! ');
        }
        
    })

    socket.on('disconnect', () => {
        let id = socketIds.indexOf(socket.id);
        socketIds.splice(id,1);
        usuarios.splice(id,1);
        console.log(socketIds);
        console.log(usuarios);
        console.log('user disconnected');
    });
    
})

http.listen(3000, () => {
    console.log('Listening on *:3000');
});

