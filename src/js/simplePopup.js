(function( $ ) {

    var methods = {
        // Методы
        init : function( options ) {
            var opt = $.extend({

            },options);

            return this.each(function () {

                var button = $(this)[0];
                var popup;

                // Draw Overlay
                if ( ($('.popup-overlay') == null) || ($('.popup-overlay').length == 0)) {
                    $('.popup').first().before('<div class="popup-overlay"></div>');
                    var overlay = $('.popup-overlay');
                    $(overlay).css({
                        'width': '100%',
                        'position': 'fixed',
                        'top': 0,
                        'right': 0,
                        'bottom': 0,
                        'left': 0,
                        'background': 'rgba(0,0,0,0.5)'
                    })
                    .hide();
                }

                /*  EVENTS  */

                $(button).click(function () {
                    popup = $(button).data('popup-target');
                    $(popup).data('visible',false).attr('data-visible',false);

                    if ( $(popup).data('visible') == false ) {
                        $('.popup-overlay').fadeIn('fast');
                        $(popup).fadeIn('fast').data('visible',true).attr('data-visible',true);
                        disable_scroll();
                        positioned (popup);
                    }
                });

                $('.popup-close, .popup-overlay').click(function () {
                    $(popup).fadeOut('fast').data('visible',false).attr('data-visible',false);
                    $(overlay).fadeOut('fast');
                    enable_scroll();
                });

                $(window).resize(function(){
                    positioned (popup);
                });

                /*  FUNCTIONS   */

                function disable_scroll() {
                    $(document).on('mousewheel DOMMouseScroll', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });
                }

                function enable_scroll() {
                    $(document).off('mousewheel DOMMouseScroll');
                }

                function positioned (popup) {
                    var top = position_top(popup);
                    var left = position_left(popup);

                    $(popup).css({
                        'top': top,
                        'left': left
                    });
                }

                function position_top(popup) {
                    var rez = ($(window).outerHeight() / 2) - ($(popup).outerHeight() / 2);
                    return rez;
                }

                function position_left(popup) {
                    var rez = (($(window).outerWidth() / 2) - ($(popup).outerWidth() / 2)) - 15;
                    return rez;
                }
            });
        }
    };

    $.fn.simplePopup = function(method) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод "' + method + '" не найден в плагине jQuery.simplePopup');
        }
    };
})(jQuery);