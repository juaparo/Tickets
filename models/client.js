const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientsSchema = new Schema({
    idn: String,
    name: String,
    lastName: String,
    birthDay: Date,
    joinDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Client', clientsSchema);