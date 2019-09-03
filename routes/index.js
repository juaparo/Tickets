const express = require('express');
const router = express.Router();

const ctrlPeople = require('../controllers/controllerPeople');
const ctrlCompany = require('../controllers/controllerCompany');
const ctrlClient = require('../controllers/controllerClient');
const ctrlTicket = require('../controllers/controllerTicket');

// Rutas People
router.post('/create', ctrlPeople.create);

router.get('/people', ctrlPeople.showPeople);

router.get('/people/one/:id', ctrlPeople.ShowOne)

router.put('/people/update/one', ctrlPeople.update);

// Rutas Client

router.post('/register/client', ctrlClient.register);

// Controlador Companies

router.post('/create/company', ctrlCompany.createCompany);

// Tickets

router.post('/create/ticket', ctrlTicket.createTicket); 
router.get('/tickets', ctrlTicket.getTickets);
router.get('/ticket/:id', ctrlTicket.getTicket);
router.put('/update/ticket/:id', ctrlTicket.updateTicket);
router.get('/new/tickets/:new', ctrlTicket.ticketByStatus);
router.get('/current/status', ctrlTicket.currentTicketState);

// Metrics
router.get('/metric', ctrlPeople.metrics);
router.get ('/metric/countries/sales', ctrlCompany.metricCompanies);

module.exports = router;
