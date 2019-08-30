const mongoose = require('mongoose');
const { Schema } = mongoose;

const peopleSchema = new Schema({
    name: String,
    lastName: String,
    address: String,
    gender: {
        type: String,
        enum: ['masculino', 'femenino', 'otro']
    },
    joinAt: Date
});

peopleSchema.statics.getChartGender = function () {
    return this.aggregate([
        {
            $project: {
                male: {$cond: [{$eq: ["$gender", "masculino"]}, 1, 0]},
                female: {$cond: [{$eq: ["$gender", "femenino"]}, 1, 0]},
                other: {$cond: [{$eq: ["$gender", "otro"]}, 1, 0]},
            }
            
        },
        {
            $group: {
                _id: 0,
                male: {$sum: "$male"},
                female: {$sum: "$female"},
                other: {$sum: "$other"}
            }
        }
    ])
}

module.exports = mongoose.model('People', peopleSchema);
