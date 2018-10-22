/* 
    *** STEP (4) ***
    This file is responsible for the database connection!
*/

module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    // Set the Mongoose promise library to Promise to avoid console warnings
    mongoose.Promise = Promise;

    // Create a standard mongoose connection
    mongoose.connect(config.database, {
        // useMongoClient: true,
        useNewUrlParser: true,
        promiseLibrary: global.Promise
    });
    
    database.on('error',error => console.log(`Connection to BudgetManager database failed: ${error}`));
    
    database.on('connected', () => console.log('Connected to BudgetManager database'));

    database.on('disconnected', () => console.log('Disconnected from BudgetManager database'));

    process.on('SIGINT', () => {
        database.close(() => {
            console.log('BudgetManager terminated, connection closed');
            process.exit(0);
        })
    });
};

// Next Step: Setup the server in /services/index.js