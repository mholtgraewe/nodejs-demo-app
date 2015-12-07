'use strict';

process.env.NODE_ENV = 'test';

// accept self signed TLS/SSL certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const config = require('../../config/config'),
      app = require('../../app'),
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
              password = 'password',
              submit = "#register-form .submit",
              usernameError = "#username-error",
              passwordError = "#password-error";

        beforeEach(function (done) {
            browser.visit('/register', done);
        });

        it('should fail if username is empty', function (done) {
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

        it('should fail if password is empty', function (done) {
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

        it('should fail if username already exists');
        it('should fail if email already exists');
        it('should create and log in the new user and forward her to the dashboard');
    });
});