$(function () {
    //default modal call:
    $('[aa-modal]').aamodal();

    //modal call with options:
    $('.aa-modal-demo__btn--alt').aamodal({
        src: '/ajax/modal-3.html',
        id: 'altModal',
        class: 'aa-modal__body--alt',
        closeBtnSelector: '.modal-content__button',
        closeBtnExternal: '/img/alt-close-btn.svg',
        //closeBtnText: false, //false deletes the corner button
        animation: 'fromTop',
        animationDuration: 200,
        overlayFadeDuration: 150, //false is equal to 0 ms
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