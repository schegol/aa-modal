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
        preloader = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMDAgNjA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjMDAwMDAwIiB3aWR0aD0iMTAwIiBoZWlnaGl0PSIxMDAiPg0KCTxjaXJjbGUgY3g9IjMzLjMiIGN5PSIzMCIgcj0iNSIgZmlsbC1vcGFjaXR5PSIwLjUiPg0KCQk8YW5pbWF0ZSANCgkJCWF0dHJpYnV0ZU5hbWU9ImZpbGwtb3BhY2l0eSIgDQoJCQlmcm9tPSIwLjUiIA0KCQkJdG89IjAuNSIgDQoJCQliZWdpbj0iMHMiIA0KCQkJZHVyPSIwLjc1cyIgDQoJCQl2YWx1ZXM9IjAuNTswLjk7MC41OzAuMTswLjUiIA0KCQkJcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiDQoJCQlrZXlTcGxpbmVzPSINCgkJCQkwIDAgMC42NSAxOw0KCQkJCTAuNjUgMCAxIDE7DQoJCQkJMCAwIDAuNjUgMTsNCgkJCQkwLjY1IDAgMSAxOw0KCQkJIg0KCQkJa2V5VGltZXM9IjA7MC4yNTswLjU7MC43NTsxIg0KCQkJY2FsY01vZGU9InNwbGluZSINCgkJLz4NCgkJPGFuaW1hdGUgDQoJCQlhdHRyaWJ1dGVOYW1lPSJjeSIgDQoJCQlmcm9tPSIzMCIgDQoJCQl0bz0iMzAiIA0KCQkJYmVnaW49IjBzIiANCgkJCWR1cj0iMC43NXMiIA0KCQkJdmFsdWVzPSIzMDsyMDszMDs0MDszMCIgDQoJCQlyZXBlYXRDb3VudD0iaW5kZWZpbml0ZSINCgkJCWtleVNwbGluZXM9Ig0KCQkJCTAgMCAwLjY1IDE7DQoJCQkJMC42NSAwIDEgMTsNCgkJCQkwIDAgMC42NSAxOw0KCQkJCTAuNjUgMCAxIDE7DQoJCQkiDQoJCQlrZXlUaW1lcz0iMDswLjI1OzAuNTswLjc1OzEiDQoJCQljYWxjTW9kZT0ic3BsaW5lIg0KCQkvPg0KCQk8YW5pbWF0ZSANCgkJCWF0dHJpYnV0ZU5hbWU9InIiIA0KCQkJZnJvbT0iNSIgDQoJCQl0bz0iNSIgDQoJCQliZWdpbj0iMHMiIA0KCQkJZHVyPSIwLjc1cyIgDQoJCQl2YWx1ZXM9IjU7NDs1OzY7NSIgDQoJCQlyZXBlYXRDb3VudD0iaW5kZWZpbml0ZSINCgkJCWtleVNwbGluZXM9Ig0KCQkJCTAgMCAwLjY1IDE7DQoJCQkJMC42NSAwIDEgMTsNCgkJCQkwIDAgMC42NSAxOw0KCQkJCTAuNjUgMCAxIDE7DQoJCQkiDQoJCQlrZXlUaW1lcz0iMDswLjI1OzAuNTswLjc1OzEiDQoJCQljYWxjTW9kZT0ic3BsaW5lIg0KCQkvPg0KCTwvY2lyY2xlPg0KCTxjaXJjbGUgY3g9IjUwIiBjeT0iMjAiIHI9IjQiIGZpbGwtb3BhY2l0eT0iMC45Ij4NCgkJPGFuaW1hdGUgDQoJCQlhdHRyaWJ1dGVOYW1lPSJmaWxsLW9wYWNpdHkiDQoJCQlmcm9tPSIwLjkiDQoJCQl0bz0iMC45Ig0KCQkJYmVnaW49IjBzIg0KCQkJZHVyPSIwLjc1cyINCgkJCXZhbHVlcz0iMC45OzAuNTswLjE7MC41OzAuOSIgDQoJCQlyZXBlYXRDb3VudD0iaW5kZWZpbml0ZSINCgkJCWtleVNwbGluZXM9Ig0KCQkJCTAuNjUgMCAxIDE7DQoJCQkJMCAwIDAuNjUgMTsNCgkJCQkwLjY1IDAgMSAxOw0KCQkJCTAgMCAwLjY1IDE7DQoJCQkiDQoJCQlrZXlUaW1lcz0iMDswLjI1OzAuNTswLjc1OzEiDQoJCQljYWxjTW9kZT0ic3BsaW5lIg0KCQkvPg0KCQk8YW5pbWF0ZSANCgkJCWF0dHJpYnV0ZU5hbWU9ImN5Ig0KCQkJZnJvbT0iMTUiDQoJCQl0bz0iMTUiDQoJCQliZWdpbj0iMHMiDQoJCQlkdXI9IjAuNzVzIg0KCQkJdmFsdWVzPSIyMDszMDs0MDszMDsyMCIgDQoJCQlyZXBlYXRDb3VudD0iaW5kZWZpbml0ZSINCgkJCWtleVNwbGluZXM9Ig0KCQkJCTAuNjUgMCAxIDE7DQoJCQkJMCAwIDAuNjUgMTsNCgkJCQkwLjY1IDAgMSAxOw0KCQkJCTAgMCAwLjY1IDE7DQoJCQkiDQoJCQlrZXlUaW1lcz0iMDswLjI1OzAuNTswLjc1OzEiDQoJCQljYWxjTW9kZT0ic3BsaW5lIg0KCQkvPg0KCQk8YW5pbWF0ZSANCgkJCWF0dHJpYnV0ZU5hbWU9InIiIA0KCQkJZnJvbT0iNCIgDQoJCQl0bz0iNCINCgkJCWJlZ2luPSIwcyIgDQoJCQlkdXI9IjAuNzVzIiANCgkJCXZhbHVlcz0iNDs1OzY7NTs0Ig0KCQkJcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiDQoJCQlrZXlTcGxpbmVzPSINCgkJCQkwLjY1IDAgMSAxOw0KCQkJCTAgMCAwLjY1IDE7DQoJCQkJMC42NSAwIDEgMTsNCgkJCQkwIDAgMC42NSAxOw0KCQkJIg0KCQkJa2V5VGltZXM9IjA7MC4yNTswLjU7MC43NTsxIg0KCQkJY2FsY01vZGU9InNwbGluZSINCgkJLz4NCgk8L2NpcmNsZT4NCgk8Y2lyY2xlIGN4PSI2Ni42IiBjeT0iMzAiIHI9IjUiIGZpbGwtb3BhY2l0eT0iMC41Ij4NCgkJPGFuaW1hdGUgDQoJCQlhdHRyaWJ1dGVOYW1lPSJmaWxsLW9wYWNpdHkiDQoJCQlmcm9tPSIwLjUiIA0KCQkJdG89IjAuNSINCgkJCWJlZ2luPSIwcyIgDQoJCQlkdXI9IjAuNzVzIiANCgkJCXZhbHVlcz0iMC41OzAuMTswLjU7MC45OzAuNSINCgkJCXJlcGVhdENvdW50PSJpbmRlZmluaXRlIg0KCQkJa2V5U3BsaW5lcz0iDQoJCQkJMCAwIDAuNjUgMTsNCgkJCQkwLjY1IDAgMSAxOw0KCQkJCTAgMCAwLjY1IDE7DQoJCQkJMC42NSAwIDEgMTsNCgkJCSINCgkJCWtleVRpbWVzPSIwOzAuMjU7MC41OzAuNzU7MSINCgkJCWNhbGNNb2RlPSJzcGxpbmUiDQoJCS8+DQoJCTxhbmltYXRlIA0KCQkJYXR0cmlidXRlTmFtZT0iY3kiDQoJCQlmcm9tPSIzMCIgDQoJCQl0bz0iMzAiDQoJCQliZWdpbj0iMHMiIA0KCQkJZHVyPSIwLjc1cyINCgkJCXZhbHVlcz0iMzA7NDA7MzA7MjA7MzAiIA0KCQkJcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiDQoJCQlrZXlTcGxpbmVzPSINCgkJCQkwIDAgMC42NSAxOw0KCQkJCTAuNjUgMCAxIDE7DQoJCQkJMCAwIDAuNjUgMTsNCgkJCQkwLjY1IDAgMSAxOw0KCQkJIg0KCQkJa2V5VGltZXM9IjA7MC4yNTswLjU7MC43NTsxIg0KCQkJY2FsY01vZGU9InNwbGluZSINCgkJLz4NCgkJPGFuaW1hdGUgDQoJCQlhdHRyaWJ1dGVOYW1lPSJyIg0KCQkJZnJvbT0iNSIgDQoJCQl0bz0iNSINCgkJCWJlZ2luPSIwcyIgDQoJCQlkdXI9IjAuNzVzIiANCgkJCXZhbHVlcz0iNTs2OzU7NDs1Ig0KCQkJcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiDQoJCQlrZXlTcGxpbmVzPSINCgkJCQkwIDAgMC42NSAxOw0KCQkJCTAuNjUgMCAxIDE7DQoJCQkJMCAwIDAuNjUgMTsNCgkJCQkwLjY1IDAgMSAxOw0KCQkJIg0KCQkJa2V5VGltZXM9IjA7MC4yNTswLjU7MC43NTsxIg0KCQkJY2FsY01vZGU9InNwbGluZSINCgkJLz4NCgk8L2NpcmNsZT4NCjwvc3ZnPg0K',
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
            '.aa-modal__body--loading::before {\n'+
                'content: "";\n'+
                'position: absolute;\n'+
                'top: 0;\n'+
                'left: 0;\n'+
                'width: 100%;\n'+
                'height: 100%;\n'+
                'background-color: #fff;\n'+
                'background-image: url("' + preloader + '");\n'+
                'background-position: center;\n'+
                'background-repeat: no-repeat;\n'+
                'background-size: 120px 120px;\n'+
                'z-index: 2;\n'+
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