const passport = require("passport")



module.exports = app => {

    require('./user')(app)
    app.use(passport.initialize())
    require("./passport")(passport)


}