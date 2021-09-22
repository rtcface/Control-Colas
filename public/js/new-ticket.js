const lblNuevoTicket =document.querySelector('#lblNuevoTicket');
const btnCreate = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnCreate.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCreate.disabled = true;
});





btnCreate.addEventListener( 'click', () => {

    socket.emit( 'next-ticket', null, ( ticket ) => {
        console.log('Desde el server', ticket );
    });

});