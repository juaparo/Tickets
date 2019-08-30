const mongoose = require('mongoose');
const { Schema } = mongoose;

const ticketSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now()
    },
    description: String,
    lastSeen: Date,
    status: {
        type: String,
        enum: ['Nuevo','Recibido', 'Enproceso', 'Solucionado'],
        default: 'Nuevo'
    },
    reason: {
        type: String,
        // Red, Blue, Yellow, Gray
        enum: ['Bug', 'Rendimiento', 'Diseño', 'Otro']
    }
});

ticketSchema.statics.getNewTickets = function (status){
    return this.find({status: status});
}

module.exports = mongoose.model('Ticket', ticketSchema);