const mongoose = require('mongoose');
const Company = require('../models/company');
const ctrlCompany = {}

ctrlCompany.createCompany = async (req, res) => {
    try {
        const companyData = req.body;

        if (!companyData) return res.json({ message: 'Error', success: false });

        const newCompany = new Company(companyData);

        const companyStored = await newCompany.save();

        if (!companyStored) return res.json({
            success: false,
            message: 'Error storing data'
        })

        return res.json({
            success: true,
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

ctrlCompany.metricCompanies = async (req, res) => {
    try {

        let metricCompany = await Company.getCompaniesPerCountrySales();

         
        if (!metricCompany) return res.json({
            success: false,
            message: 'Error capturing data'
        })

        return res.json({
            success: true,
            metric: metricCompany,
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

module.exports = ctrlCompany;
