const lblNuevoTicket =document.querySelector('#lblNuevoTicket');
const btnCreate = document.querySelector('button');


const socket = io();

socket.on('connect', () => {
    
    btnCreate.disabled = false;

    socket.on('last-ticket', (ticket) => {
        lblNuevoTicket.innerText='Ticket: '+ticket;
    })

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCreate.disabled = true;
});


btnCreate.addEventListener( 'click', () => {

    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText=ticket;
        console.log('Desde el server', ticket );
    });

});