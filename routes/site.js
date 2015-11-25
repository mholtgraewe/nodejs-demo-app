'use strict';

let authenticate = require('../middleware/authenticate');

module.exports = function (app) {
    app.get('/about', function (req, res, next) {
        res.render('about', {
            title: 'About',
            isAboutPage: true
        });
    });

    app.get('/dashboard', authenticate, function (req, res, next) {
        res.render('dashboard', {
            title: 'Dashboard',
            isDashboardPage: true
        });
    });

    app.get('/', function (req, res, next) {
        res.redirect('/about');
    });
};