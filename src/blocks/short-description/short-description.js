$(document).ready(function () {
    $('.short-description__list-button').click(function () {
        $(this).toggleClass('expanded');
        $(this).find('.arrow').toggleClass('down top');
        $(this).siblings('.section-list').toggleClass('is-visible');
    });
});