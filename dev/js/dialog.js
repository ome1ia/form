$(document).ready(function() {
    $('.js-dialog_show').on('click', function(event) {
        var dialog = $(this).data('toggle');
        $(dialog).removeClass('g-hidden');

        event.preventDefault();
    });

    $('.js-dialog__close').on('click', function() {
        var dialog = $(this).parents('.js-dialog')
        dialog.addClass('g-hidden');
    });
});