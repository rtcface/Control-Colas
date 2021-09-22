const path = require('path');
const fs   = require('fs');


class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl{
    constructor() {
        this.last     = 0;
        this.today    = new Date().getDate();
        this.tickets  = [];
        this.lastFour = [];
        this.init();
    }

    get toJson() { 
        return{
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour,
        }
    }

    init() {
        const { today,lastFour,tickets,last } = require('../db/data.json');
        if(today===this.today){
            this.tickets=tickets;
            this.lastFour=lastFour;
            this.last=last;
        }else{
            //TODO: it's another day
            this.dbSave(); 
        }
    }

    dbSave() {

        const dbPath = path.join( __dirname,'../db/data.json');

        fs.writeFileSync( dbPath, JSON.stringify(this.toJson));

    }

    next() {
        this.last +=1;
        // this.number=this.last;
        const ticket = new Ticket( this.last, null );
        this.tickets.push(ticket);

        this.dbSave();

        return 'Ticket ' + ticket.number;

    }

    attendTicket( desktop ) {

        // TODO: validate ticket existence

        if( this.tickets.length === 0 ){
            return null;
        }

        const ticket = this.tickets.shift();

        ticket.desktop = this.desktop;

        this.lastFour.unshift(ticket);

        if( this.lastFour.length > 4){
            this.lastFour.splice(-1,1);

        }

        this.dbSave();

        return ticket;

    }

}

module.exports = TicketControl;
