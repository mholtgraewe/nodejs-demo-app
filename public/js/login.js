jQuery(function ($) {
    'use strict';

    $('#login-form').validate({
        rules: {
            username: {
                required: true,
                maxlength: 20
            },
            password: {
                required: true,
                maxlength: 12
            }
        },
        submitHandler: function (form) {
            $('.submit', form).prop('disabled', true);
            form.submit();
        }
    });
});