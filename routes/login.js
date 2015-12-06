'use strict';

let config = require('../config/config'),
    dbErrorCodes = config.db.errorCodes,
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    secureConnection = require('../middleware/secureConnection'),
    bcrypt = require('bcryptjs'),
    extend = require('extend');

module.exports = function (app) {

    function initRegisterLocals (req, res, next) {
        extend(res.locals, {
            title: 'Register',
            csrfToken: req.csrfToken(),
            isRegisterPage: true,
            _js: [ 'register' ]
        });
        next();
    };

    app.get('/register', secureConnection, initRegisterLocals, function (req, res, next) {
        res.render('register');
    });

    app.post('/register', secureConnection, initRegisterLocals, function (req, res, next) {
        let form = req.body;

        let errors = validateForm();
        if (errors) {
            return showErrorPage(errors);
        }

        User.findById(form.username, function (err, user) {
            if (err) return next(err);

            if (user) {
                return showErrorPage({ username: { msg: 'User already exists.'} });
            }

            bcrypt.hash(form.password, config.bcrypt.cost, function (err, hash) {
                if (err) return next(err);

                let newUser = new User({
                    username: form.username,
                    email: form.email,
                    password: hash
                });

                newUser.save(function (err) {
                    if (err) {
                        if (err.code === dbErrorCodes.duplicateKey) {
                            return showErrorPage({ email: { msg: 'Email already exists.' } });
                        }
                        return next(err);
                    }

                    // delete password to avoid risk of accidental exposure
                    delete newUser.password;

                    req.session.user = newUser;
                    res.redirect('/dashboard');
                });
            });
        });

        function validateForm() {
            req.sanitize('username').trim();
            req.sanitize('username').xss();
            req.check('username')
                .matches(/^\b\w+\b$/).withMessage('Please use only letters (a-z), numbers and the underscore.')
                .notEmpty().withMessage('This field is required.')
                .isLength(0, 20).withMessage('Please enter no more than 20 characters.');

            req.sanitize('email').trim();
            req.sanitize('email').xss();
            req.sanitize('email').toLowerCase();
            req.check('email')
                .notEmpty().withMessage('This field is required.')
                .isEmail().withMessage('Please enter a valid email address.')
                .isLength(0, 100).withMessage('Please enter no more than 100 characters.');

            req.sanitize('password').trim();
            req.check('password', 'Please enter a password')
                .notEmpty().withMessage('This field is required.')
                .isLength(3, 12).withMessage('Please enter no more than 12 characters')
                .isLength(3).withMessage('Please enter at least 3 characters.');

            return req.validationErrors(true);
        }

        function showErrorPage(errors) {
            res.render('register', {
                username: form.username,
                email: form.email,
                errors
            });
        }
    });

    function initLoginLocals (req, res, next) {
        extend(res.locals, {
            title: 'Login',
            csrfToken: req.csrfToken(),
            isLoginPage: true,
            _js: [ 'login' ]
        });
        next();
    };

    app.get('/login', secureConnection, initLoginLocals, function (req, res, next) {
        res.render('login');
    });

    app.post('/login', secureConnection, initLoginLocals, function (req, res, next) {
        let form = req.body;

        let errors = validateForm();
        if (errors) {
            return showErrorPage(errors);
        }

        User.findById(form.username, function (err, user) {
            if (err) return next(err);

            if (!user) {
                return showErrorPage();
            }

            bcrypt.compare(form.password, user.password, function (err, passwordMatches) {
                if (err) return next(err);

                if (!passwordMatches) {
                    return showErrorPage();
                }

                // delete password to avoid risk of accidental exposure
                user = user.toObject();
                delete user.password;

                req.session.user = user;
                res.redirect('/dashboard');
            });
        });

        function validateForm() {
            req.sanitize('username').trim();
            req.sanitize('username').xss();
            req.check('username')
                .notEmpty().withMessage('This field is required.')
                .isLength(0, 20).withMessage('Please enter no more than 20 characters.');

            req.sanitize('password').trim();
            req.check('password')
                .notEmpty().withMessage('This field is required.')
                .isLength(0, 12).withMessage('Please enter no more than 12 characters.');

            return req.validationErrors(true);
        }

        function showErrorPage(errors) {
            errors = errors || { username: {}, password: { msg: 'Invalid username or password.' } };

            res.render('login', {
                username: form.username,
                errors
            });
        };
    });

    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('http://' + req.headers.host);
        });
    });
};