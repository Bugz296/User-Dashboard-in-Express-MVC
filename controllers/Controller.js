class Controller{
    constructor(){
        const express = require('express');
        const session = require('express-session');
        const app = express();
        app.use(session({
            secret: 'thisIsForUserDashboard',
            name: 'user_dashboard',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
        }));
        this.session = session;
    }
}
module.exports = Controller;