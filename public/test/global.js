(function ($) {
    'use strict';

    var should = chai.should();

    describe('Layout', function () {
        var $nav = $('nav.navbar'),
            $main = $('main'),
            $footer = $('body > footer');

        it('should have a title', function () {
            $('title').should.exist.and.not.be.empty;
        });

        it('should have a main navigation bar', function () {
            $nav.should.exist;
        });

        it('should have a main section', function () {
            $main.should.exist;
        });

        it('should have a footer', function () {
            $footer.should.exist;
        });

        describe('Main navigation bar', function () {
            it('should have a branding logo with a home link', function () {
                $('a.navbar-brand', $nav).should.exist.and.have.attr('href', '/');
            });

            it('should have a link to the "About" section', function () {
                $nav.should.have.descendants('a[href="/about"]');
            });

            it('should have a link to the dashboard', function () {
                $nav.should.have.descendants('a[href="/dashboard"]');
            });

            it('should have either links to registration and login or a logout link', function () {
                $nav.should.satisfy(function () {
                    var register = $('a[href="/register"]', $nav)[0],
                        login    = $('a[href="/login"]', $nav)[0],
                        logout   = $('a[href="/logout"]', $nav)[0];
                    return (register && login && !logout) || (!register && !login && logout);
                });
            });
        });

        describe('Main section', function () {
            it('should have a page header', function () {
                $('.page-header', $main).length.should.equal(1);
            });
        });
    });
})(jQuery);