const mongoose = require('mongoose');

require('dotenv').config({ path: 'hide_variables.env' });

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(db => console.log('DB Conectada'))
    .catch(err => console.error(err));


// Init app
const app = require('./app');
app.set('port', process.env.PORT || 5000);

// Init server
const server = app.listen(app.get('port'), () => {
    console.log(`Corriendo en el puerto -> ${server.address().port}`);
})

// Modelos
const People = require('./models/people');

module.exports = mongoose;