var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    db = require('./sequelize');


passport.use(new LocalStrategy(
    function (username, password, done) {
        db.User.find({ where: { username: username }}).then(function (user) {
            if (user && user.authenticate(password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    if (user) {
        done(null, user.id);
    }
});

passport.deserializeUser(function (id, done) {
    db.User.find({ where: { id:id } }).then(function (user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});

module.exports = passport;