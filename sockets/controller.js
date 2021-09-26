const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl();

const socketController = (socket) => {    
    
   
    socket.emit('last-ticket',ticketControl.last);
    socket.emit('current-state',ticketControl.lastFour);
    socket.emit('tickets-pending',ticketControl.tickets);

    socket.on('next-ticket', ( payload, callback ) => {
            const next = ticketControl.next();
            callback( next );
            socket.broadcast.emit('tickets-pending',ticketControl.tickets);
           
    });

    socket.on('atender-ticket',( { escritorio }, callback) => {

         
        //TODO: Notify that there is a new pending ticket
        socket.emit('tickets-pending',ticketControl.tickets);
        socket.broadcast.emit('tickets-pending',ticketControl.tickets);


        if( !escritorio ) {
            return callback({
                ok: false,
                message: 'the desktop is required'
            });           
        }
        console.log(escritorio);
        const ticket = ticketControl.attendTicket( escritorio );
        socket.broadcast.emit('current-state',ticketControl.lastFour);
        console.log(ticket);
        if( !ticket ) 
        {
            callback({
                ok: false,
                message: 'there are no pending tickets'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
            console.log(ticket);
        }
    });

}



module.exports = {
    socketController
}

