function contentSlider() {
    if ( $(window).outerWidth() <= 768 )
        window.contentSlider = Swipe(document.getElementById('content-slider'));
    else
        window.contentSlider.kill();
}
function contentSliderMove() {
    if ( $(this).data('state') != 'disabled' ){
        if ( $(this).hasClass('next') ){
            window.contentSlider.next();
        } else if ( $(this).hasClass('prev') ) {
            window.contentSlider.prev();
        }
        $(this).data('state','disabled').attr('data-state','disabled');
        $(this).siblings().data('state','enabled').attr('data-state','enabled');
    }
}
$(document).ready(function () {
    contentSlider();
    $('.capabilities__control').click(contentSliderMove);
});
$(window).resize(contentSlider);
