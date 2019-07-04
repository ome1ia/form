$(document).ready(function() {
    $('.js-tab_show').on('click', function(event) {
        var target = $(this).attr('href');
        var tabs_content = $(target).siblings('.g-tabs__content');
        var tabs_header = $(target).siblings('.g-tabs__header');
        var tabs_titles = tabs_header.find('.js-tab_show');
        var tabs_title_active = tabs_header.find('a[href="'+target+'"]');
        
        tabs_content.each(function() {
            $(this).addClass('g-hidden');
        });
        $(target).removeClass('g-hidden');

        tabs_titles.each(function() {
            $(this).removeClass('g-tabs__title--active');
        });
        tabs_title_active.addClass('g-tabs__title--active');

        event.preventDefault();
    });
});