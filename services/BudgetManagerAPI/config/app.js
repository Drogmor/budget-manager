/* 
    *** STEP (6) ***
    This is the main app.js file
*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const consign = require('consign');
const cors = require('cors');
const passport = require('passport');
// Import the passport configuration file and pass 'passport' as an arguement
// This allows to access passport inside passport.j without requiring it
const passportConfig = require('./passport')(passport);
const jwt = require('jsonwebtoken');
const config = require('./index.js');
const database = require('./database')(mongoose, config);

// Start using the packages and setting the secret

app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
/* 
    Alternatively without the cors module:
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res,header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
*/
app.use(passport.initialize());

app.set('budgetsecret', config.secret);