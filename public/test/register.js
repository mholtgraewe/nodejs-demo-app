(function ($) {
    'use strict';

    var should = chai.should();

    describe('Registration page', function () {
        var $regForm = $('form#register-form');

        it('should have a registration form', function () {
            $regForm.should.exist;
        });

        describe('Registration form', function () {
            it('should submit form data via POST', function () {
                $regForm.should.have.attr('method', 'POST');
            });

            it('should submit form data to the registration endpoint', function () {
                $regForm.should.have.attr('action', '/register');
            });

            it('should have an email field', function () {
                $('input[name="email"]', $regForm)
                        .should.exist.and.have.attr('type', 'email');
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
        });
    });
})(jQuery);