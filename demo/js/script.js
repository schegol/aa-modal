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
        animationDuration: 2500,
        animationTimingFunction: 'ease-in-out',
        onOpenStart: function(event, trigger) {
            console.log('onOpenStart');
            // console.log(event);
            // console.log(trigger);
        },
        onOpenEnd: function(event, trigger) {
            console.log('onOpenEnd');
            // console.log(event);
            // console.log(trigger);
        },
        onCloseStart: function(event, trigger) {
            console.log('onCloseStart');
            // console.log(event);
            // console.log(trigger);
        },
        onCloseEnd: function(event, trigger) {
            console.log('onCloseEnd');
            // console.log(event);
            // console.log(trigger);
        },
    });

    //usage of close method:
    // $(document).on('keyup', function(e) {
    //     if (e.key === 'x') {
    //         $().aamodal('close');
    //     }
    // });
});