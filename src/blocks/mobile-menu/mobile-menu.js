$(document).ready( function () {
    // Collapse - Expanded menu
    $('header').mobileMenu({
        button: '#mobile-menu-button',
        menu: '.mobile-menu'
    });
});
(function( $ ) {

    var methods = {
        // Методы
        init : function( options ) {
            var opt = $.extend({
                button: 'header.button',
                menu: 'header.menu'
            },options);

            return this.each(function () {
                var header = $(this)[0];
                var button = opt.button;
                var menu = $(header).find(opt.menu);

                $(button).click(function () {
                    $(header).toggleClass('collapse expanded');
                    $(menu).toggleClass('is-hidden is-visible');
                });
            })
        }
    };

    $.fn.mobileMenu = function(method) {
        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод "' + method + '" не найден в плагине jQuery.mobileMenu');
        }
    };
})(jQuery);
