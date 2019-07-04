$(document).ready(function() {
    //проверка email
    function checkEmail(value) {
        return /\S+@\S{2,}\.\w{2,}/gi.test(value)
    }

    $('.js-email').on('blur', function() {
        if( !checkEmail($(this).val()) ) {
            $(this).addClass('error');

            $(this).siblings('label').find('.js-error_message').text('поле заполнено не верно');
        } else if($(this).hasClass('error')) {
            $(this).removeClass('error');
            $(this).siblings('label').find('.js-error_message').text('');
        }
    });

    $('.js-email').on('input', function() {
        if( $(this).hasClass('error') && checkEmail($(this).val()) ) {
            $(this).removeClass('error');
            $(this).siblings('label').find('.js-error_message').text('');
        }
    });

    //валидация формы
    $('.g-form').on('submit', function(event) {
        if($(this).find('.error').length) {
            event.preventDefault();
        }
    });

    //показ-скрытие пароля
    $('.js-toggle_password').on('click', function() {
        var password_input = $(this).siblings('input');

        if(password_input.attr('type') == 'password') {
            password_input.attr('type', 'text');
            $(this).text('Скрыть');
        } else {
            password_input.attr('type', 'password');
            $(this).text('Показ');
        }
    });
});