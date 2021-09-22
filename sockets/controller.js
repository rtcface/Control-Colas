const TicketControl = require('../models/ticket-control')

const ticketControl = new TicketControl();

const socketController = (socket) => {    
    
   
    socket.emit('last-ticket',ticketControl.last);

    socket.on('next-ticket', ( payload, callback ) => {
            const next = ticketControl.next();
            callback( next );
            
            //TODO: Notify that there is a new pending ticket
    })

}



module.exports = {
    socketController
}

