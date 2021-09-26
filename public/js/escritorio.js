// html references
const lbDesktop = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('the desktop is required');
}

const escritorio = searchParams.get('escritorio');
lbDesktop.innerText = escritorio;

divAlert.style.display = 'none'; 


const socket = io();

socket.on('connect', () => {
    
    btnAtender.disabled = false;

    socket.on('last-ticket', (ticket) => {
        lblTicket.innerText='Ticket: '+ticket;
    })

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});

socket.on('tickets-pending', ( payload ) => {
    const {length} = payload;
    //divAlert.style.display = ''; 
    if( length === 0 ){
        divAlert.style.display = ''; 
        lblPendientes.innerText = '';
        btnAtender.disabled = true;
    }else{
        lblPendientes.innerText = length;
        divAlert.style.display = 'none';
        btnAtender.disabled = false
    }

});


btnAtender.addEventListener( 'click', () => {
 console.log('btn events');
    socket.emit( 'atender-ticket', { escritorio }, ( {ok,ticket,message} ) => {
        divAlert.style.display = 'none';   
        //console.log(ticket);
        console.log(ok);
        if(!ok) {
            lblTicket.innerText = 'Ticket a Nadie'
            return divAlert.style.display = '';
        }
        lblTicket.innerText = 'Ticket '+ ticket.number; 
    });

});