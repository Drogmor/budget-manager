/* 
    This file ensures that models are loaded before anything else in the application
*/

const mongoose = require('mongoose');
const UserModel = require('@BudgetManagerModels/user');

const models = {
    User: mongoose.model('User')
}

module.exports = models;