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
        modalIsLoading = false,
        modalIsOpen = false,
        defaultOpenTriggers = '[aa-modal]',
        defaultCloseTriggers = '[aa-modal-close]',
        styleTag = $('<style></style'),
        modalStyle = '\n'+
            'body.aa-modal-open {\n'+
                'overflow: hidden;\n'+
            '}\n'+
            '.aa-modal {\n'+
                'position: fixed;\n'+
                'top: 0;\n'+
                'left: 0;\n'+
                'width: 100vw;\n'+
                'height: 100vh;\n'+
                'background-color: rgba(0,0,0,.5);\n'+
                'cursor: pointer;\n'+
                'z-index: 999999;\n'+
            '}\n'+
            '.aa-modal__body {\n'+
                'position: absolute;\n'+
                'top: 50%;\n'+
                'left: 50%;\n'+
                'width: calc(100vw - 40px);\n'+
                'max-width: 600px;\n'+
                'height: auto;\n'+
                'max-height: calc(100vh - 40px);\n'+
                'padding: 55px 30px 45px;\n'+
                'background-color: #fff;\n'+
                'border-radius: 5px;\n'+
                'transform: translate(-50%, -50%);\n'+
                'cursor: default;\n'+
                'overflow-y: auto;\n'+
                'z-index: 1000000;\n'+
            '}\n'+
            '.aa-modal__close {\n'+
                'position: absolute;\n'+
                'top: 20px;\n'+
                'right: 20px;\n'+
                'display: flex;\n'+
                'justify-content: center;\n'+
                'align-items: center;\n'+
                'width: 20px;\n'+
                'height: 20px;\n'+
                'padding: 0;\n'+
                'background-color: transparent;\n'+
                'border: none;\n'+
                'cursor: pointer;\n'+
            '}\n'+
            '.aa-modal__close path {\n'+
                'fill: #000;\n'+
                'transition: fill .3s;\n'+
            '}\n'+
            '.aa-modal__close:focus {\n'+
                'outline: none;\n'+
            '}\n'+
            '.aa-modal__close:hover path,\n'+
            '.aa-modal__close:focus path {\n'+
                'fill: rgba(0,0,0,.5);\n'+
            '}\n'+
        '';

    //default settings:
    let defaultSettings = {
        src: false,
        id: false,
        class: false,
        closeBtn: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 212.982 212.982" style="enable-background:new 0 0 212.982 212.982;" xml:space="preserve">\n'+
            '<path fill="#000000" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312 c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312 l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937 c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/>\n'+
        '</svg>',
        animation: 'fadeIn',
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
            let settings = $.extend(true, {}, defaultSettings, options);

            return this.each(function() {
                let triggers = $(this);

                triggers.on('click', settings, function(e) {
                    let trigger = $(this);
                    
                    openModal(settings, trigger, e);
                });
            });
        },
        close: function() {
            console.log('close method called');
        }
    };

    //inner functions:
    function createModal(settings, trigger) {
        let src = settings.src || trigger.attr('aa-modal-src').toString(),
            aaModalOverlay = $('<div class="aa-modal"></div>'),
            aaModalBody = $('<div class="aa-modal__body"></div>'),
            aaModalCloseBtn = $('<button class="aa-modal__close" type="button" aa-modal-close=""></button>'),
            moreCloseBtns;

        if (src === undefined) {
            $.error('Modal content source is not specified');
            // error = 'Modal content source is not specified';
        }

        if (settings.closeBtn instanceof $) {
            // set additional close button(s)
            moreCloseBtns = settings.closeBtn;
            settings.closeBtn = defaultSettings.closeBtn;
        } else if (typeof settings.closeBtn !== 'string') {
            $.error('False type of closeBtn property in settings');
            // error = 'False type of closeBtn property in settings';
        }

        // console.log(moreCloseBtns);

        aaModalCloseBtn.html(settings.closeBtn);
        aaModalBody.append(aaModalCloseBtn);

        if (settings.id)
            aaModalBody.prop('id', settings.id);

        if (settings.class)
            aaModalBody.addClass(settings.class);

        getModalContent(src, aaModalBody);
        aaModalOverlay.append(aaModalBody);

        aaModalOverlay.on('click', function(e) {
            console.log(e.target);
            if (!aaModalBody.is(e.target) && aaModalBody.has(e.target).length === 0) {
                //call the close method
                console.log('time to close');
            } else if (moreCloseBtns !== undefined && (moreCloseBtns.is(e.target) || moreCloseBtns.has(e.target).length !== 0)) {
                //call the close method
                console.log('time to close');
            } else if ($(defaultCloseTriggers).is(e.target) || $(defaultCloseTriggers).has(e.target).length !== 0) {
                //call the close method
                console.log('time to close');
            };
        });
        
        return aaModalOverlay;
    }

    function openModal(settings, trigger, e) {
        if (typeof defaultSettings.onOpenStart == 'function') {
            settings.onOpenStart(e, trigger);
        };

        modalIsLoading = true;

        let modal = createModal(settings, trigger);
        addStyle(settings);
        $('body').append(modal).addClass('aa-modal-open');

        modalIsLoading = false;

        if (typeof defaultSettings.onOpenEnd == 'function') {
            settings.onOpenEnd(e, trigger);
        };
    }
    
    function addStyle(settings) {
        let style = createStyle(settings);

        $('head').prepend(style);
    }

    function createStyle(settings) {
        styleTag.text(modalStyle);
        return styleTag;
    }

    function getModalContent(src, modalBody) {
        let content;

        $.ajax({
            url: src,
            dataType: 'html',
            contentType: false,
            processData: false,
            timeout: 15000,
            success: function(data) {
                modalBody.append(data);
            },
            error: function(obj, err) {
                if (err == 'timeout') {
                    $.error('Request failed: timeout');
                    // error = 'Request failed: timeout';
                } else {
                    $.error('Request failed: ' + obj.responseText);
                    // error = 'Request failed: ' + obj.responseText;
                }
            }
        });
    }

    $.fn.aamodal = function(optionsOrMethod) {
        if (methods[optionsOrMethod]) {
            return methods[optionsOrMethod].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof optionsOrMethod === 'object' || !optionsOrMethod) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  optionsOrMethod + ' does not exist in AA Modal');
            // error = 'Unknown AA Modal method called';
        }  
    };
}));