/*  
    ***STEP (1)***
    This file holds the database connection parameters
    and the secret to generate JWT token
*/
module.exports = {
    secret: 'budgetsecret',
    session: { session: false},
    database: 'mongodb://127.0.0.1:27017/budgetmanager'
}

// Next Step: Create the User model (user.js) in the app/models folder