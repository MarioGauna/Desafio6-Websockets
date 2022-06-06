const socket=io();

const divChat = document.querySelector('#chat');
const boton = document.querySelector('#enviar');
const respuesta = document.querySelector('#warning');
const btnGuardar= document.querySelector('#guardar');
const body = document.querySelector('#table-body');

boton.addEventListener("click",(event)=>{
    respuesta.innerHTML=" ";
    const usuario = document.querySelector('#user').value;
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(usuario) ){
        const mensaje = document.querySelector('#texto').value;
        const message={
            autor:usuario,
            hora:new Date().toLocaleString(),
            texto:mensaje
        }
        socket.emit('newMessage',message)
    } else {
        respuesta.innerHTML="Debe ingresar un mail";
    } 
})

btnGuardar.addEventListener("click",(event)=>{
    const title = document.querySelector('#title').value;
    const price = document.querySelector('#price').value;
    const image = document.querySelector('#image').value;
    if (title !== '' && price !== '' && image !== '') {
        const producto ={
            "title": title,
            "price": price,
            "image": image
        }
        socket.emit('product',producto)
    }

})

socket.on('messages',(messages)=>{
    divChat.innerHTML=messages.map(message=>{
        return(
            `<div>
            <span style="color:blue; font-weight: bold;">${message.autor}</span>
            <span style="color:brown">${message.hora}</span>
            <span style="color:green; font-style: italic;">${message.texto}</span>
            </div>
            `
        )
    }).join(" ")
})

socket.on('newMessages',(messages)=>{
    divChat.innerHTML = messages.map(message=>{
        return(
            `<div>
            <span style="color:blue; font-weight: bold;">${message.autor}</span>
            <span style="color:brown">${message.hora}</span>
            <span style="color:green; font-style: italic;">${message.texto}</span>
            </div>
            `
        )
    }).join(" ")
})

socket.on('newProduct',(products)=>{
    body.innerHTML = " ";
    body.innerHTML = products.map(products =>{
        return(
            `<tr>
                <td class="table-info">${products.id}</td>
                <td class="table-info">${products.title}</td>
                <td class="table-info">${products.price}</td>
                <td class="table-info"><img src=${products.image} alt="No image" width="20px"/></td>
            </tr>
            `
        )
    }).join(" ")
})