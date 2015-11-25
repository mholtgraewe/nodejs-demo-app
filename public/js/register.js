jQuery(function ($) {
    'use strict';

    $('#register-form').validate({
        rules: {
            username: {
                required: true,
                maxlength: 20,
                maxWords: 1
            },
            email: {
                required: true,
                email: true,
                maxlength: 100
            },
            password: {
                required: true,
                minlength: 3,
                maxlength: 12
            }
        },
        messages: {
            username: {
                maxWords: 'Please use only letters (a-z), numbers and the underscore.'
            }
        },
        submitHandler: function (form) {
            $('.submit', form).prop('disabled', true);
            form.submit();
        }
    });
});