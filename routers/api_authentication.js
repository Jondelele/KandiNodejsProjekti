// api_authentication.js file handles user authorization and authentication

const router = require('express').Router();
const db_user = require('../database/db_user');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Route for user authentication
router.post('/api/authenticate', (req, res) => {
    // Username and password sent by user is saved to userData object
    var userData = {
        username: req.body.username,
        password: req.body.password
    };

    // User information is fetched from database
    db_user.getUserAndPassword(userData).then((userDB) => {

        // Even if user wasn't found the bcrypt compare is done anyways to make sure that same amount of time passes even in
        // cases that user wasn't found. This is because of security, because now hackers cannot test which kind of usernames
        // there is in the database.
        if (!userDB) {
            bcrypt.compare("dummy_password123132", "$2b$10$VKVTsw9x2Sjr9629P6RMwumQc9vuMEeKAxcoqM82.s/jSf9TjGzRe").then((resp) => {
                return res.status(403).json({err: 'User or password not found'});
            });
        }

        // Checks if the hash made from user given password matches the passwd hash fetched from database
        // If not, the user gave wrong passwd
        bcrypt.compare(userData.password, userDB.password_hash).then((resp) => {
            if (!resp) {
                // Returns error code if password is wrong
                return res.status(403).json({err: 'User or password not found'});
            }

            // If password was correct, an unique jwt token is created for the user
            const token = jwt.sign({user_id: userDB.user_id}, config.secret, {expiresIn: '15 days'})

            // User is sent a success response including newly made jwt token
            res.cookie('authCookie', 'Bearer ' + token);
            return res.send(token);
        });

    }).catch((e) => {
        // Error response is sent to the user if something goes wrong
        return res.send(e);
    });

});

// Logout route for logging the user out by deleting the users cookie, this happens by sending empty cookie to user
router.get('/api/logout', (req, res) => {
    try {
        res.cookie('authCookie', '');
        res.redirect('/login.html');

    } catch (error) {
        return res.send(error)
    }
})

// Route which checks that the user is authenticated if the user tries to access sensitive resources
router.use((req, res, next) => {
    // Users token that came together with the request is saved to variable bearerHeader
    const bearerHeader = req.headers['authorization'] || req.cookies ? req.cookies.authCookie : null;

    if (bearerHeader && bearerHeader.split(' ').length == 2) {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];

        // Checks the validity of the jwt token
        jwt.verify(bearerToken, config.secret, (err, decoded) => {
            if (err) {
                res.status(403).redirect('/login.html');
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // Forbidden error is sent to the user if the token wasn't valid or it didn't exist
        res.status(403).redirect('/login.html');
    }
});

module.exports = router;
