$(function () {
    $('[aa-modal]').aamodal();

    $('.aa-modal-demo__btn--alt').aamodal({
        src: '/ajax/modal-3.html',
        id: 'altModal',
        class: 'aa-modal__body--alt',
        closeBtnSelector: '.modal-content__button',
        closeBtnExternal: '/img/alt-close-btn.svg',
        //closeBtnText: false, //false deletes the default button
        animation: 'fromTop',
        animationDuration: 2500,
        animationTimingFunction: 'ease-in-out',
        onOpenStart: function(event, trigger) {
            console.log('onOpenStart');
        },
        onOpenEnd: function(event, trigger) {
            console.log('onOpenEnd');
        },
        onCloseStart: function(event, trigger) {
            console.log('onCloseStart');
        },
        onCloseEnd: function(event, trigger) {
            console.log('onCloseEnd');
        },
    });
});