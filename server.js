const express = require('express');
const {Server: ioServer} = require('socket.io');
const http = require('http');
const app = express();
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);
const contenedor = require('./contenedor.js');
const content = new contenedor('./database/productos.json');
const chat = new contenedor('./database/chat.json')

app.use(express.static(__dirname +"/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('views','./views');
app.set('view engine', 'ejs');

app.get('/',async(req,res)=>{
    const products = await content.getAll();
    res.render('index.ejs',{products})
})

app.post('/productos',async(req,res)=>{
    res.redirect('/')
})

io.on('connection',async(socket)=>{
    console.log('Cliente conectado',socket.id);
    
    const mensajes = await chat.getAll();
    socket.emit('messages', mensajes)

    socket.on('newMessage', async(message)=>{
        await chat.save(message);
        const mensajes = await chat.getAll();
        io.sockets.emit('newMessages', mensajes)
    })
    socket.on('product', async(data)=>{
        await content.save(data);
        const products = await content.getAll();
        io.sockets.emit('newProduct', products)
    })
})

const PORT=8080;
httpServer.listen(PORT,()=>{
    console.log(`Servidor escuchando puerto ${PORT}`);
});

