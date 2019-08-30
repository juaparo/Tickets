const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    name: String,
    country: String,
    moneySales: Number
});

companySchema.statics.getCompaniesPerCountrySales = function () {
    return this.aggregate([
        {
            $group: {
                _id: { country: '$country'},
                sales: { $sum: '$moneySales' }
            }
        }
    ])
}

module.exports = mongoose.model('Company', companySchema);
