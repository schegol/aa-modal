$(function () {
    $('[aa-modal]').aamodal();

    $('.aa-modal-demo__btn--alt').aamodal({
        src: '/ajax/modal-3.html',
        id: 'altModal',
        class: 'aa-modal__body--alt',
        closeBtn: $('.modal-content__button'), //or text, i.e. 'Close'
        animation: 'fromTop',
        animationDuration: 3000,
        animationTimingFunction: 'ease-in-out',
        onOpenStart: function(event, trigger) {
            // console.log(event);
            // console.log(trigger);
        },
    });
});