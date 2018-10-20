/* 
    *** STEP (5) ***
    This file is responsible for the server configuration
*/

/* 
    Register the module_alias (optional module to keep the code clean)
    module_alias allows to create aliases of directories and register custom module name paths
    module_alias allows to use '@BudgetManagerAPI'
*/
require('module-alias/register');
const http = require('http');
const BudgetManagerAPI = require('@BudgetManagerAPI');
const BudgetManagerServer = http.Server(BudgetManagerAPI);
const BudgetManagerPORT = process.env.PORT || 3001;
const LOCAL = '0.0.0.0';

BudgetManagerServer.listen(BudgetManagerPORT, LOCAL, () => console.log(`BudgetManagerAPI running on ${BudgetManagerPORT}`));

// Now we can start the server by typing 'node services' in the terminal
// Next Step: Create the app.js file inside the ./config folder