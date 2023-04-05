$(function () {
	let modalCallBtns = $('[aa-modal]');

    // modalCallBtns.aamodal();

    modalCallBtns.on('click', function(e) {
        e.preventDefault();
        let btn = $(this);

        btn.aamodal();
    });
});