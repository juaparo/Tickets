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
        enum: ['Nuevo', 'Recibido', 'Enproceso', 'Solucionado'],
        default: 'Nuevo'
    },
    reason: {
        type: String,
        // Red, Blue, Yellow, Gray
        enum: ['Bug', 'Rendimiento', 'Diseño', 'Otro']
    }
});

ticketSchema.statics.getNewTickets = function (status) {
    return this.find({ status: status });
}


ticketSchema.statics.getAllTickets = function () {
    return this.aggregate([{
        $project: {
            reason: 1,
            description: 1,
            createAt: 1,
            status: 1,
            order: {
                $cond: {
                    if: { $eq: ["$status", "Nuevo"] }, then: 1,
                    else: {
                        $cond: {
                            if: { $eq: ["$status", "Recibido"] }, then: 2,
                            else: {
                                $cond: {
                                    if: { $eq: ["$status", 'Enproceso'] }, then: 3,
                                    else: 4
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    {
        $sort: {
            "order": 1
        }
    },
    {
        $project: {
            reason: 1,
            description: 1,
            createAt: 1,
            status: 1
        }
    }
    ]);
}

module.exports = mongoose.model('Ticket', ticketSchema);