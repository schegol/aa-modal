;(function(factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';

    let error = null,
        style = '';

    $.fn.aamodal = function(options) {
        let settings = $.extend({
            //setting1: '1',
            //setting2: '2',
            //...

            // callbacks:
            onOpenStart: function() {},
            onOpenEnd: function() {},
            onCloseStart: function() {},
            onCloseEnd: function() {},
        }, options);
 
        return this.each(function() {
            console.log($(this));
        });
    };
}));