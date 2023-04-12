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

    let modalIsLoading = false,
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

    //errors object:
    const errors = {
        0: 'Reserved',
        1: 'Method does not exist in AA Modal',
        2: 'Wrong option data type',
        3: 'Option is not a valid number',
        4: 'Modal content source is not specified',
        5: 'External button request failed',
        6: 'External button file contains invalid data',
        7: 'Modal content request failed',
        //to be continued
    }

    //default settings:
    let defaultSettings = {
        src: false,
        id: false,
        class: false,
        closeBtnText: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 212.982 212.982" style="enable-background:new 0 0 212.982 212.982;" xml:space="preserve">\n'+
            '<path fill="#000000" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312 c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312 l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937 c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/>\n'+
        '</svg>',
        closeBtnExternal: false,
        closeBtnSelector: false,
        animation: 'fadeIn',
        animationDuration: 1000,
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

            checkSettingsTypes(settings);

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
    function checkSettingsTypes(settings) {
        for (let prop in settings) {
            let type = typeof settings[prop];

            if (settings[prop] === false)
                continue;

            switch(prop) {
                case 'onOpenStart':
                case 'onOpenEnd':
                case 'onCloseStart':
                case 'onCloseEnd':
                    if (type !== 'function')
                        throwError(2, prop);

                    break;
                case 'animationDuration':
                    if (type !== 'string' && type !== 'number')
                        throwError(2, prop);

                    let int = parseInt(settings[prop]);

                    if (!Number.isInteger(int))
                        throwError(3, prop);

                    break;
                default:
                    if (type !== 'string')
                        throwError(2, prop);
            }
        }
    }

    function throwError(code, data = false) {
        let errorText = errors[code];

        if (data)
            errorText += ': ' + data;

        return $.error(errorText);
    }

    function createModal(settings, trigger) {
        let src = settings.src || trigger.attr('aa-modal-src').toString(),
            closeBtns = defaultCloseTriggers + ', ' + settings.closeBtnSelector,
            aaModalOverlay = $('<div class="aa-modal"></div>'),
            aaModalBody = $('<div class="aa-modal__body"></div>'),
            aaModalCloseBtn = $('<button class="aa-modal__close" type="button" aa-modal-close=""></button>');

        if (src === undefined)
            throwError(4);

        if (settings.closeBtnExternal) {
            applyExternalBtnContents(settings.closeBtnExternal, aaModalCloseBtn, defaultSettings.closeBtnText);
        } else {
            if (settings.closeBtnText)
                aaModalCloseBtn.html(settings.closeBtnText);
            else
                aaModalCloseBtn.html(defaultSettings.closeBtnText);
        }

        if (settings.closeBtnText)
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
            }
        });

        aaModalBody.on('click', closeBtns, function() {
            //call the close method
            console.log('time to close');
        })
        
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

        //TODO: promises
        modalIsLoading = false;
        modalIsOpen = true;

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
                if (err == 'timeout')
                    throwError(7, err);
                else
                    throwError(7, obj.statusText);
            }
        });
    }

    function applyExternalBtnContents(src, btnNode, defaultHtml) {
        $.ajax({
            url: src,
            dataType: 'html',
            contentType: false,
            processData: false,
            timeout: 15000,
            success: function(data) {
                let svg = $(data).filter('svg');

                if (svg.length) {
                    btnNode.html(svg);
                } else {
                    btnNode.html(defaultHtml);
                    throwError(6);
                }
            },
            error: function(obj, err) {
                btnNode.html(defaultHtml);

                if (err == 'timeout')
                    throwError(5, err);
                else
                    throwError(5, obj.statusText);
            }
        });
    }

    //prototype:
    $.fn.aamodal = function(optionsOrMethod) {
        if (methods[optionsOrMethod]) {
            return methods[optionsOrMethod].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof optionsOrMethod === 'object' || !optionsOrMethod) {
            return methods.init.apply(this, arguments);
        } else {
            throwError(1, optionsOrMethod);
        }  
    };
}));