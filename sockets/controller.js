const TicketControll = require('../models/ticket-control')

const ticketControll = new TicketControll();

const socketController = (socket) => {    
    
   
    socket.on('next-ticket', ( payload, callback ) => {
            const next = ticketControll.next();
            callback( next );
            
            //TODO: Notify that there is a new pending ticket
    })

}



module.exports = {
    socketController
}

