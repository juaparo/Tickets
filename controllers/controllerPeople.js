const mongoose = require('mongoose');
const People = require('../models/people');
const ctrlPeople = {}

ctrlPeople.create = async (req, res) => {

    try {
        const peopleData = req.body;

        if (!peopleData) return res.json({ message: 'Error', success: false });

        const newPeople = new People(peopleData);

        const peopleStored = await newPeople.save();

        if (!peopleStored) return res.json({
            success: false,
            message: 'Error while data was saving'
        })

        return res.json({
            message: 'Saved!',
            success: true
        })

    } catch (error) {
        console.warn(error);
        return res.json({ message: 'Internal Error', error: error });

    }
}

ctrlPeople.showPeople = async (req, res) => {
    try {
        const showPeople = await People.find();

        if (!showPeople) return res.json({
            success: false,
            message: 'Error capturing data'
        })

        return res.json({
            success: true,
            people: showPeople
        })

    } catch (error) {
        console.warn(error);
        return res.json({ message: 'Internal Error', error: error });

    }
}

ctrlPeople.ShowOne = async (req, res) => {
    try {
        let query = {
            _id: req.params.id
        }

        const person = await People.findOne(query);

        if (!person) return res.json({ success: false, message: 'La persona que buscas no existe' });

        return res.json({ success: true, person: person });


    } catch (error) {
        console.warn(error);
        return res.json({ message: 'Internal Error', error: error });


    }

}

ctrlPeople.update = async (req, res) => {
    
    try {
        let query = {
            _id: req.body.id
        }

        const dataToUpdate = req.body;

        const person = await People.findByIdAndUpdate(query, dataToUpdate, { new: true });

        if (!person) return res.json({success: false, message: 'Error al enviar los datos'});

        return res.json({
            success: true,
            person: person,
            message: 'Actulaizado'
        })

    } catch (error) {
        console.warn(error);
        return res.json({ success: false, message: 'Internal error server'});
    }
}

ctrlPeople.metrics = async (req, res) => {
    try {
        let metric = await People.getChartGender();
        
        if (!metric) return res.json({
            success: false,
            message: 'Error capturing data'
        })

        return res.json({
            success: true,
            metric: metric,
            message: 'Complete!'
        })


    } catch (error) {
        console.warn(error);
        return res.json({
            success: false,
            message: 'Internal error sever'
        })
    }
}

module.exports = ctrlPeople;