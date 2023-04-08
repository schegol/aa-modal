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
        style = '',
        styleTag = $('<style></style'),
        modalIsLoading = false,
        modalIsOpen = false,
        defaultOpenTriggers = '[aa-modal]',
        defaultCloseTriggers = '[aa-modal-close]';

    //default settings:
    let defaultSettings = {
        src: '',
        id: '',
        class: '',
        closeBtn: '',
        animation: 'none',
        animationDuration: '1000',
        animationTimingFunction: 'linear',

        // callbacks:
        onOpenStart: function() {},
        onOpenEnd: function() {},
        onCloseStart: function() {},
        onCloseEnd: function() {},
    }

    //methods:
    let methods = {
        init : function(options) {
            let settings = $.extend({}, defaultSettings, options);

            return this.each(function() {
                let trigger = $(this);

                // console.log($(this));

                // selector = getSelectorString(trigger);

                // $(document).on('click', selector, function (e) {
                //     openModal(settings);
                // });
                trigger.on('click', function (e) {
                    // openModal(settings);
                    console.log('clicked');
                });
            });
        },
        close: function() {
            console.log('close method called');
        }
    };

    //inner functions:
    function getSelectorString(obj) {
        
    }

    function openModal(settings) {
        
    }

    $.fn.aamodal = function(optionsOrMethod) {
        if (methods[optionsOrMethod]) {
            return methods[optionsOrMethod].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof optionsOrMethod === 'object' || !optionsOrMethod) {
            return methods.init.apply(this, arguments); // default to methods[init]
        } else {
            // $.error('Method ' +  optionsOrMethod + ' does not exist on AA Modal');
            error = 'Unknown AA Modal method called';
        }  
    };
}));