const LocalStrategy = requier("passport-local").Strategy;
const { Customer } = require('../../models')

passport.use(new LocalStrategy(
    (username, password, done) => {
        Customer.findOne({ username: username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));