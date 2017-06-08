(function () {

    const arkanoidWrapper = document.querySelector('#arkanoid');
    console.log(arkanoidWrapper);

    const refElements = arkanoidWrapper.querySelectorAll('[ref]');
    const view = {};

    [].forEach.call(refElements, function (refElement) {
    	const name = refElement.getAttribute('ref');
    	if (name) {
    		view[name] = refElement;
    	}
    });

    function onMouseDown(e) {
    	document.addEventListener('mousemove', onMouseMove, false);
    }

    function onMouseMove(e) {
		view.paddle.style.left = e.pageX + 'px';
	}

    view.paddle.addEventListener('mousedown', onMouseDown, false);
    view.paddle.addEventListener('mouseup', function (e) {

    	document.removeEventListener('mousemove', onMouseMove, false);
    }, false);

}());