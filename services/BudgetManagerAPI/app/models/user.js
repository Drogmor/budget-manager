/* 
    *** STEP (2) ***    
    This file creates the User model for the JWT Auth
*/
const mongoose = require('mongoose'); // require mongoose to create the User model
const bcrypt = require('bcrypt');   // require bcrypt to hash the users' passwords

/*  Create the Schema 
    A user has:
    1) Username
    2) Password
    3) Clients {
        Each Client will have:
        3.i)      Email
        3.ii)     Name
        3.iii)    Phone
        3.iv)     Budgets {
            Every budget will have:
            iv.i)  State
            iv.ii)  Title
            iv.iii)  Items
            iv.iv)  Price
        }
    }
*/
const Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clients: [{}]
});

// Generate a salt and hash the user's password
Schema.pre('save', function (next){
    const user = this;
    if (this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, (error, salt) => {
            if (error) return next(error);

            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) return next(error);

                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Function to compare passwords to check if the login attempt is valid
Schema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, matches) => {
        if (error) return callback(error);
        callback(null, matches);
    });
};

// Finally create the User model
mongoose.model('User', Schema);


// Next step: create the passport.js file