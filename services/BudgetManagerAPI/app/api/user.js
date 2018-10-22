/* 
    *** STEP (10) ***
    This file creates the api methods for the user
*/

const mongoose = require('mongoose');
// Create the empty 'api' object
const api = {};

/*
    Add the setup(User) method in the user api
    This method is just to create an admin account for debugging
    THIS METHOD SHOULD NOT EXIST IN PRODUCTION
*/

api.setup = (User) => (req, res) => {
    const admin = new User({
        username: 'admin',
        password: 'admin',
        clients: []
    });

    admin.save(error => {
        if (error) throw error;
        console.log('Admin account was succesfully set up');
        res.json({success: true});
    })
}

/* 
    Create a test method that allows to see every User that's registered in the app
    for authentication testing
*/

api.index = (User, BudgetToken) => (req, res) => {
    const token = BudgetToken;

    if (token) {
        User.find({}, (error, users) => {
            if (error) throw error;
            res.status(200).json(users);
        });
    } else return res.status(403).send({success: false, message: 'Unauthorized'});
}


/*
    Add the signup(User) method
    1) check if the username or password are empty
    2) create a new user if the username is valid
*/    
api.signup = (User) => (req, res) => {
    if (!req.body.username || !req.body.password) res.json({success: false, message: 'Please insert a username and a password.'});
    else {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            clients: []
        });

        newUser.save((error) => {
            if (error) return res.status(400).json({success: false, message:'Username already exists.'});
            res.json({success: true, message: 'Account created successfully'});
        })
    }
}

module.exports = api;

// Next Step: Create the user.js file in the ./routes folder