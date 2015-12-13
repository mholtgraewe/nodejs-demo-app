'use strict';

process.env.NODE_ENV = 'test';

// accept self signed TLS/SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const config = require('../../config/config'),
      app = require('../../app'),
      mongoose = require('mongoose'),
      bcrypt = require('bcryptjs'),
      User = mongoose.model('User'),
      http = require('http'),
      Browser = require('zombie'),
      expect = require('chai').expect;

Browser.localhost('localhost', config.server.http.port);

describe('Registration page', function () {
    const browser = new Browser( { runScripts: false });

    before(function (done) {
        http.createServer(app).listen(config.server.http.port, done);
    });

    describe('Form submission', function () {
        const username = 'username',
              email = 'email',
              password = 'password',
              submit = "#register-form .submit",
              usernameError = "#username-error",
              emailError = '#email-error',
              passwordError = "#password-error";

        beforeEach(function (done) {
            browser.visit('/register', done);
        });

        it('should fail if username is empty', function (done) {
            browser.fill('username', '');
            browser.pressButton(submit, function (err) {
                expect(browser.text(usernameError)).to.equal('This field is required.');
                done();
            });
        });

        it('should fail if username contains more than 20 characters', function (done) {
            browser.fill(username, 'a_very_long_username1');
            browser.pressButton(submit, function (err) {
                expect(browser.text(usernameError))
                    .to.equal('Please enter no more than 20 characters.');
                done();
            });
        });

        it('should fail if username contains whitespace', function (done) {
            browser.fill(username, 'John Doe');
            browser.pressButton(submit, function (err) {
                expect(browser.text(usernameError))
                    .to.equal('Please use only letters (a-z), numbers and the underscore.');
                done();
            });
        });

        it('should fail if email is empty', function (done) {
            browser.fill(email, '');
            browser.pressButton(submit, function (err) {
                expect(browser.text(emailError)).to.equal('This field is required.');
                done();
            });
        });

        it('should fail if email is invalid', function (done) {
            browser.fill('email', 'invalid_email_address');
            browser.pressButton(submit, function (err) {
                expect(browser.text(emailError)).to.equal('Please enter a valid email address.');
                done();
            });
        });

        it('should fail if email is longer than 100 characters', function (done) {
            browser.fill('email', 'x'.repeat(87) + "@localhost.com");
            browser.pressButton(submit, function (err) {
                expect(browser.text(emailError))
                    .to.equal('Please enter no more than 100 characters.');
                done();
            });
        });

        it('should fail if password is empty', function (done) {
            browser.fill('password', '');
            browser.pressButton(submit, function (err) {
                expect(browser.text(passwordError)).to.equal('This field is required.');
                done();
            });
        });

        it('should fail if password contains less than 3 characters', function (done) {
            browser.fill(password, 'ab');
            browser.pressButton(submit, function (err) {
                expect(browser.text(passwordError))
                    .to.equal('Please enter at least 3 characters.');
                done();
            });
        });

        it('should fail if password contains more than 12 characters', function (done) {
            browser.fill(password, '0123456789abc');
            browser.pressButton(submit, function (err) {
                expect(browser.text(passwordError))
                    .to.equal('Please enter no more than 12 characters.');
                done();
            });
        });

        it('should fail if username already exists', function (done) {
            clearUsers(function (err) {
                createUser('test_user', 'test_user@localhost.com', '12345',
                    function (err) {
                        browser.fill(username, 'test_user');
                        browser.fill(email, 'some_email@localhost.com');
                        browser.fill(password, '12345');

                        browser.pressButton(submit, function (err) {
                            expect(browser.text(usernameError)).to.equal('User already exists.');
                            done();
                        });
                    }
                );
            });
        });

        it('should fail if email already exists', function (done) {
            clearUsers(function (err) {
                createUser('test_user', 'test_user@localhost.com', '12345',
                    function (err) {
                        browser.fill(username, 'some_user');
                        browser.fill(email, 'test_user@localhost.com');
                        browser.fill(password, '12345');

                        browser.pressButton(submit, function (err) {
                            expect(browser.text(emailError)).to.equal('Email already exists.');
                            done();
                        });
                    }
                );
            });
        });

        it('should create and log in the new user and forward her to the dashboard', function (done) {
            clearUsers(function (err) {
                browser.fill(username, 'test_user');
                browser.fill(email, 'test_email@localhost.com');
                browser.fill(password, '12345');

                browser.pressButton(submit, function (err) {
                    expect(browser.text('.page-header h1')).to.equal('Dashboard');

                    User.findById('test_user', function (err, user) {
                        expect(user).to.exist;

                        let passwordMatches = bcrypt.compareSync('12345', user.password);
                        expect(passwordMatches).to.be.true;

                        done();
                    })
                });
           });
        });
    });


    // helper functions

    function clearUsers(callback) {
        User.remove({}, callback);
    }

    function createUser(username, email, password, callback) {
        let user = new User({
            _id: username,
            email,
            password: bcrypt.hashSync(password, config.bcrypt.cost)
        });
        user.save(callback);
    }
});