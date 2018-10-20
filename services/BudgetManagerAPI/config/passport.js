/* 
    *** STEP (3) ***
    Need Mongoose to access the User model 
    and PassportJWT for authentication
*/
const PassportJWT = require('passport-jwt');
const ExtractJWT = PassportJWT.ExtractJwt;
const Strategy = PassportJWT.Strategy;
const config = require('./index.js');
const models = require('@BudgetManager/app/setup');


/* 
    Instantiate the User model 
    and get a user by matching the JWT token
    with the token got from the client 
*/
module.exports = (passport) => {
    const User = models.User;

    const parameters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };

    passport.use(new Strategy(parameters, (payload, done) => {
        User.findOne({id: payload.id}, (error, user) => {
            if (error) return done(error, false);
            if (user) done(null, user);
            else done(null, false);
        });
    }));
}

// Next step: create the database.js file