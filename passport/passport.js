const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const User = require('./db_user')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret'
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ name: jwt_payload.name }).then(user => {
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
            .catch(err => console.log(err))
    }));
}