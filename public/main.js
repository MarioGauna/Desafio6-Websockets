const socket=io();

const divChat = document.querySelector('#chat');
const boton = document.querySelector('#enviar');
const respuesta = document.querySelector('#warning');

boton.addEventListener("click",(event)=>{
    respuesta.innerHTML=" ";
    const usuario = document.querySelector('#user').value;
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(usuario) ){
        const mensaje = document.querySelector('#texto').value;
        const time = new Date();
        const hora = new Date();
        const message={
            autor:usuario,
            dia:time.toISOString().split('T')[0],
            hora:hora.toLocaleTimeString(),
            texto:mensaje
        }
        socket.emit('newMessage',message)
    } else {
        respuesta.innerHTML="Debe ingresar un mail";
    } 
})

socket.on('messages',(messages)=>{
    divChat.innerHTML=messages.map(message=>{
        return(
            `<div>
            <span style="color:blue; font-weight: bold;">${message.autor}</span>
            <span style="color:brown">${message.dia}</span>
            <span style="color:brown">${message.hora}</span>
            <span style="color:green; font-style: italic;">${message.texto}</span>
            </div>
            `
        )
    }).join(" ")
})