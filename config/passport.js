const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
    ussernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    Users.findOne({ email })
        .then((user) => {
            if (!user || !user.validate(password)) {
                return done(null, false, { errors: { 'email or password': 'is valid' } });
            }
            return done(null, user);
        }).catch(done);
}));
