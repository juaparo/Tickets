const mongoose = require('mongoose');
const Ticket = require('../models/ticket');
const ctrlTicket = {}

ctrlTicket.createTicket = async (req, res) => {
    try {

        const dataTicket = req.body;

        if (!dataTicket) return res.json({
            success: true,
            message: 'Error'
        })

        const newTicket = new Ticket(dataTicket);

        const ticketStored = await newTicket.save();

        if (!ticketStored) return res.json({
            success: false,
            message: 'Error storing data'
        });


        return res.json({
            success: true,
            message: 'Saved!'
        })

    } catch (error) {
        console.warn(error);
        return res.json({
            success: false,
            message: 'Internal error server'
        });

    }
}

ctrlTicket.getTickets = async (req, res) => {

    try {
        const getTickets = await Ticket.getAllTickets();

        if (!getTickets) return res.json({
            success: true,
            message: 'Error capturing data'
        });

        return res.json({
            success: true,
            tickets: getTickets,
            message: 'Exito'
        });

    } catch (error) {
        console.warn(error);

    }

}

ctrlTicket.getTicket = async (req, res) => {

    try {
        const ticket = req.params.id;

        const ticketSearched = await Ticket.findById({
            _id: ticket
        })

        if (!ticketSearched) return res.json({
            success: true,
            message: 'Erro capturing data'
        });

        if (ticketSearched) return res.json({
            success: true,
            ticket: ticketSearched,
            message: 'Éxito'
        });


    } catch (error) {
        return res.json({
            success: false,
            message: 'Internal error server'
        })
    }
}

ctrlTicket.updateTicket = async (req, res) => {
    try {
        const updates = req.body;

        console.log(updates, updates._id, updates.status);

        if (!updates) return res.json({
            success: false,
            message: 'No data'
        });

        const ticketUpdate = await Ticket.findOneAndUpdate({
            _id: updates._id
        }, {
                $set: updates
            }, {
                new: true,
            });

        if (!ticketUpdate) return res.json({
            success: false,
            message: 'Error updating data'
        })

        return res.json({
            success: true,
            ticket: ticketUpdate,
            message: 'Updated!'
        })

    } catch (error) {
        console.warn(error);
        return res.json({
            success: false,
            message: 'Internal server error'
        })

    }
}

ctrlTicket.ticketByStatus = async (req, res) => {
    try {
        let status = req.params.new;

        const newTickets = await Ticket.getNewTickets(status);

        if (!newTickets) return res.json({
            success: false,
            message: 'Error capturing data'
        });

        return res.json({
            success: true,
            tickets: newTickets,
            message: 'Exito!'
        })



    } catch (error) {
        console.warn(error);
        return res.json({
            success: false,
            message: 'Inernal server error'
        })

    }
}

ctrlTicket.currentTicketState = async (req, res) => {
    try {
        const currentState = await Ticket.currentStatus();

        if(!currentState) return res.json({
            success: false,
            message: 'Error capturing data'
        });

        return res.json({
            success: true,
            currentState: currentState,
            message: 'Exito!'
        });

    } catch (error) {
        console.warn(error);
        return res.json({
            success: false,
            message: 'Inernal server error'
        })
    }
}

module.exports = ctrlTicket;
