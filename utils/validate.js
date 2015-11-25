'use strict';

let emailValidator =  require('email-validator');

exports.email = function (email) {
    return emailValidator.validate(email);
};