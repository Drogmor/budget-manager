/* 
    *** STEP (7) ***
*/

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('@config');

// create an empty object named api and store every method we want inside of it
const api = {};

/*
    Store the login method inside api
    pass login(User) the 'User' argument since I need to access the User model
    1) The login method finds the 'User' with the matching 'username'.
    2) if 'username' is INVALID the method throws an error
    3) else compare the password and the token that the user is bearing.
*/
api.login = (User) => (req, res) => {
    User.findOne({username: req.body.username}, (error, user) => {
        if (error) throw error;

        if (!user) res.status(401).send({success: false, message: 'Authentication failed. Username not found.'});
        else {
            user.comparePassword(req.body.password, (error, matches) => {
                if (matches && !error) {
                    const token = jwt.sign({user}, config.secret);
                    res.json({success: true, message: 'Token granted', token});
                } else {
                    res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
}

/* 
    Store the verify(headers) method inside the api
    1) verify the headers
    2) get the Authorization header
*/

api.verify = (headers) => {
    if (headers && headers.authorization) {
        const split = headers.authorization.split(' ');

        if (split.length === 2) return split[1];
        else return null;
    } else return null;
}


// Export the api object

module.exports = api;

// Next Step: create the API routes in ./services/BudgetManagerAPI/app/routes in the auth.js file