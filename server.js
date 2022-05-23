const express = require('express');
const routesProducts = require('./routesProducts.js');
const {Server: ioServer} = require('socket.io');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

app.use(express.static(__dirname +"/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views','./views');
app.set('view engine', 'ejs');
app.use("/",routesProducts);

const messages=[];

io.on('connection',(socket)=>{
    console.log('Cliente conectado',socket.id);

    socket.on('newMessage',message=>{
        messages.push(message)
        io.sockets.emit('messages',messages);
    })
})

const PORT=8080;
httpServer.listen(PORT,()=>{
    console.log(`Servidor escuchando puerto ${PORT}`);
});
