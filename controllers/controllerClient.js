const mongoose = require('mongoose');
const Client = require('../models/client');
const ctrlClient = {};

ctrlClient.register = async (req, res) => {
    try {
        let Clientdata = req.body;
        console.log(Clientdata);
        
        if (!Clientdata) return res.json({
            message: 'Error',
            success: true
        })

        const newClient = new Client(Clientdata);

        const clientStored = await newClient.save();

        if (!clientStored) return res.json({
            success: false,
            message: 'Error storing data'
        })

        return res.json({
            success: true,
            client: clientStored,
            message: 'Saved!'
        })

    } catch (error) {
        console.warn(error);
        return res.json({
            success: false,
            message: 'Internal sever error'
        })
    }
}

module.exports = ctrlClient;
