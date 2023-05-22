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
            '.aa-modal__body--loading {\n'+
                'min-height: 200px;\n'+
            '}\n'+
            '.aa-modal__body::before {\n'+
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
                'opacity: 0;\n'+
                'transition-delay: 0s, .3s;\n'+
                'transition-duration: .3s, 0s;\n'+
                'transition-property: opacity, z-index;\n'+
                'z-index: -1;\n'+
            '}\n'+
            '.aa-modal__body--loading::before {\n'+
                'opacity: 1;\n'+
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

    //animations object:
    const animations = {
        fadeIn: {
            classes: {
                overlay: ' aa-modal--animated',
                modal: ' aa-modal__body--animated aa-modal__body--fade-in',
            },
            functions: {
                open: function(modalBody, duration) {
                    let def = $.Deferred();

                    modalBody.fadeIn(duration, function() {
                        def.resolve();
                    });
                    
                    return def.promise();
                },
                close: function(modalBody, duration) {
                    let def = $.Deferred();

                    modalBody.fadeOut(duration, function() {
                        def.resolve();
                    });

                    return def.promise();
                }
            }
        },
        fromTop: {
            classes: {
                overlay: ' aa-modal--animated',
                modal: ' aa-modal__body--animated aa-modal__body--from-top',
            },
            functions: {
                open: function(modalBody, duration) {
                    let def = $.Deferred();

                    modalBody.show().animate({top: '50%'}, duration, function() {
                        def.resolve();
                    });

                    return def.promise();
                },
                close: function(modalBody, duration) {
                    let def = $.Deferred();

                    modalBody.animate({top: '-' + ($(window).innerHeight() / 2) + 'px'}, duration, function() {
                        def.resolve();
                    });

                    return def.promise();
                }
            }
        },
    }

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
        8: 'Option value is not supported',
        9: 'Something went wrong during modal creating',
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
        animation: false,
        animationDuration: 500,
        overlayFadeDuration: 200,

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
                    
                    if (!modalIsLoading) {
                        openModal(settings, trigger, e);
                    }
                });
            });
        },
        close: function() {
            if (!modalIsLoading) {
                // closeModal(settings);
                console.log('close method called');
            }
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
                case 'animation':
                    if (type !== 'string')
                        throwError(2, prop);

                    if ((settings[prop] in animations) === false)
                        throwError(8, settings[prop]);

                    break;
                case 'animationDuration':
                case 'overlayFadeDuration':
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
        let createModalDef = $.Deferred(),
            src = trigger.attr('aa-modal-src') !== undefined ? trigger.attr('aa-modal-src').toString() : settings.src,
            closeBtns = defaultCloseTriggers + ', ' + settings.closeBtnSelector,
            aaModalOverlay = $('<div class="aa-modal' + (settings.overlayFadeDuration == false ? '' : ' aa-modal--fade') + '"' + (settings.overlayFadeDuration == false ? '' : ' style="display: none;"') + '></div>'),
            aaModalBody = $('<div class="aa-modal__body aa-modal__body--loading' + (settings.animation === false ? '' : animations[settings.animation].classes.modal) + '"' + (settings.animation === false ? '' : ' style="display: none;"') + '></div>'),
            aaModalCloseBtn = $('<button class="aa-modal__close" type="button" aa-modal-close=""></button>');

        if (src === undefined)
            throwError(4);

        const mainChain = function() {
            let mainChainDef = $.Deferred();

            $.when().then(function() {
                let def = $.Deferred();

                if (settings.overlayFadeDuration) {
                    aaModalOverlay.fadeIn(settings.overlayFadeDuration, function() {
                        def.resolve();
                    });
                } else {
                    def.resolve();
                }

                return def.promise();
            }).then(function() {
                let def = $.Deferred();
        
                prepareCloseBtn(settings, defaultSettings, aaModalCloseBtn).then(function() {
                    if (settings.closeBtnText)
                        aaModalBody.append(aaModalCloseBtn);
        
                    if (settings.id)
                        aaModalBody.prop('id', settings.id);
        
                    if (settings.class)
                        aaModalBody.addClass(settings.class);
        
                    def.resolve();
                });
                
                return def.promise();
            }).then(function() {
                let def = $.Deferred();

                aaModalOverlay.append(aaModalBody);

                if (settings.animation) {
                    animations[settings.animation].functions.open(aaModalBody, settings.animationDuration).then(function() {
                        def.resolve();
                    });
                } else {
                    def.resolve();
                }

                return def.promise();
            }).then(function() {
                let def = $.Deferred();

                aaModalOverlay.on('click', function(e) {
                    if (!aaModalBody.is(e.target) && aaModalBody.has(e.target).length === 0 && !modalIsLoading) {
                        closeModal(settings, $(e.target), e);
                    }
                });
        
                aaModalBody.on('click', closeBtns, function(e) {
                    if (!modalIsLoading)
                        closeModal(settings, $(e.target), e);
                });

                aaModalBody.on('keydown', function(e) {
                    let modal = $(this),
                        target = $(e.target),
                        shiftIsPressed = e.shiftKey,
                        focusableElements = 'a[href]:visible, area[href]:visible, input:visible:not([disabled]), select:visible:not([disabled]), textarea:visible:not([disabled]), button:visible:not([disabled]), iframe:visible, object:visible, embed:visible, [tabindex]:visible, [contenteditable]:visible',
                        marginalElement,
                        nextElement;

                    if (e.key === 'Tab') {
                        if (shiftIsPressed) {
                            marginalElement = modal.find(focusableElements).first();
                            nextElement = modal.find(focusableElements).last();
                        } else {
                            marginalElement = modal.find(focusableElements).last();
                            nextElement = modal.find(focusableElements).first();
                        }

                        if (marginalElement.length) {
                            if (target.is(marginalElement)) {
                                nextElement.focus();
                                return false;
                            } else {
                                return true;
                            }
                        }

                        return true;
                    }
                });

                $(document).on('keyup', function(e) {
                    if (modalIsOpen && (e.key === 'Escape' || e.key === 'Esc') && !modalIsLoading) {
                        closeModal(settings, $(e.target), e);
                    }
                });

                //new modal call inside the one that's already open:
                //TODO: make a way to add more selectors to trigger openModal() from inside?
                aaModalOverlay.on('click', defaultOpenTriggers, function(e) {
                    aaModalOverlay.off();
                    aaModalBody.off();

                    if (!modalIsLoading)
                        openModal(settings, $(e.target), e);
                });

                def.resolve();
                return def.promise();
            }).then(function() {
                mainChainDef.resolve();
            });

            return mainChainDef.promise();
        }

        $.when().then(function() {
            let def = $.Deferred();

            if (modalIsOpen) {
                aaModalOverlay = $('body').find('.aa-modal');
                aaModalBody = aaModalOverlay.children();
    
                if (settings.animation) {
                    animations[settings.animation].functions.close(aaModalBody, settings.animationDuration).then(function() {
                        aaModalBody.html('').addClass('aa-modal__body--loading');

                        def.resolve();
                    });
                } else {
                    aaModalBody.html('');

                    def.resolve();
                }
            } else {
                addStyle();
                $('body').append(aaModalOverlay).addClass('aa-modal-open');
    
                def.resolve();
            }

            return def.promise();
        }).then(function() {
            $.when(mainChain(), getModalContent(src, aaModalBody)).done(function() {
                createModalDef.resolve();
            }).fail(function(err) {
                throwError(9, err);
            });
        });

        return createModalDef.promise();
    }

    function deleteModal(settings) {
        let deleteModalDef = $.Deferred(),
            aaModalOverlay = $('body').find('.aa-modal'),
            aaModalBody = aaModalOverlay.children('.aa-modal__body');

        deleteEventHandlers(aaModalOverlay, aaModalBody).then(function() {
            let def = $.Deferred();

            if (settings.animation) {
                animations[settings.animation].functions.close(aaModalBody, settings.animationDuration).then(function() {
                    def.resolve();
                });
            } else {
                def.resolve();
            }

            return def.promise();
        }).then(function() {
            let def = $.Deferred();

            if (settings.overlayFadeDuration) {
                aaModalOverlay.fadeOut(settings.overlayFadeDuration, function() {
                    aaModalOverlay.remove();

                    def.resolve();
                });
            } else {
                aaModalOverlay.remove();
            }

            return def.promise();
        }).then(function() {
            $('body').removeClass('aa-modal-open');
            styleTag.remove();

            deleteModalDef.resolve();
        });

        return deleteModalDef.promise();
    }

    function openModal(settings, trigger, e) {
        setOpenStart(settings, trigger, e).then(
            createModal
        ).then(function() {
            modalIsLoading = false;
            modalIsOpen = true;
    
            settings.onOpenEnd(e, trigger);
        });
    }

    function closeModal(settings, trigger, e) {
        setCloseStart(settings, trigger, e).then(
            deleteModal
        ).then(function() {
            modalIsLoading = false;
            modalIsOpen = false;
    
            settings.onCloseEnd(e, trigger);
        });
    }

    function setOpenStart(settings, trigger, e) {
        let setOpenStartDef = $.Deferred();
        
        settings.onOpenStart(e, trigger);
        modalIsLoading = true;

        setOpenStartDef.resolve(settings, trigger);
        return setOpenStartDef.promise();
    }

    function setCloseStart(settings, trigger, e) {
        let setCloseStartDef = $.Deferred();
        
        settings.onCloseStart(e, trigger);
        modalIsLoading = true;

        setCloseStartDef.resolve(settings);
        return setCloseStartDef.promise();
    }

    function deleteEventHandlers(modalOverlay, modalBody) {
        let deleteEventHandlersDef = $.Deferred();

        modalOverlay.off();
        modalBody.off();

        deleteEventHandlersDef.resolve();
        return deleteEventHandlersDef.promise();
    }
    
    function addStyle() {
        let style = createStyle();

        $('head').prepend(style);
    }

    function createStyle() {
        styleTag.text(modalStyle);

        return styleTag;
    }

    function prepareCloseBtn(settings, defaultSettings, modalCloseBtn) {
        let prepareCloseBtnDef = $.Deferred();

        if (settings.closeBtnExternal) {
            applyExternalBtnContents(settings.closeBtnExternal, modalCloseBtn, defaultSettings.closeBtnText).then(function() {
                prepareCloseBtnDef.resolve();
            });
        } else {
            if (settings.closeBtnText)
                modalCloseBtn.html(settings.closeBtnText);
            else
                modalCloseBtn.html(defaultSettings.closeBtnText);

            prepareCloseBtnDef.resolve();
        }

        return prepareCloseBtnDef.promise();
    }

    function getModalContent(src, modalBody) {
        return $.ajax({
            url: src,
            dataType: 'html',
            contentType: false,
            processData: false,
            timeout: 10000,
            success: function(data) {
                modalBody.append(data).removeClass('aa-modal__body--loading');
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
        return $.ajax({
            url: src,
            dataType: 'html',
            contentType: false,
            processData: false,
            timeout: 10000,
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