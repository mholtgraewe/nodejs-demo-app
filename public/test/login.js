(function ($) {
    'use strict';

    var should = chai.should();

    describe('Login page', function () {
        var $regForm = $('form#login-form');

        it('should have a login form', function () {
            $regForm.should.exist;
        });

        describe('Login form', function () {
            it('should submit form data via POST', function () {
                $regForm.should.have.attr('method', 'POST');
            });

            it('should submit form data to the login endpoint', function () {
                $regForm.should.have.attr('action', '/login');
            });

            it('should have a username field', function () {
                $('input[name="username"]', $regForm)
                        .should.exist.and.have.attr('type', 'text');
            });

            it('should have a password field', function () {
                $('input[name="password"]', $regForm)
                        .should.exist.and.have.attr('type', 'password');
            });

            it('should have a submit button', function () {
                $('button:not([type]), button[type="submit"], input[type="submit"]', $regForm)
                        .should.exist;
            });

            it('should feature a link to the registration page', function () {
                $('a[href="/register"]', $regForm).should.exist;
            });
        });
    });
})(jQuery);