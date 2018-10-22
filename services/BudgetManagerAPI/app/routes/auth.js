/* 
    *** STEP (8) ***
    In this file I create the API routes
*/
const models = require('@BudgetManager/app/setup');

// pass my own app in the method so i can set the routes
module.exports = (app) => {
    // 'api' allows to access auth.js inside the ./api
    const api = app.BudgetManagerAPI.app.api.auth;

    // set the default route to '/'
    app.route('/')
        .get((req, res) => res.send('Budget Manager API'));

    app.route('/api/v1/auth')
        .post(api.login(models.User));
}

// Next Step: edit the ./config/app.js file