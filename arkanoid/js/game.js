(function () {

    const arkanoidWrapper = document.querySelector('#arkanoid');
    console.log(arkanoidWrapper);

    const refElements = arkanoidWrapper.querySelectorAll('[ref]');
    const view = {};
    const scoreList = [1, 3, 5];

    [].forEach.call(refElements, function (refElement) {
    	const name = refElement.getAttribute('ref');
    	if (name) {
    		view[name] = refElement;
    	}
    });
    
    const div = document.createElement('div');
	div.classList.add('brick');
    

    for (let i = 1; i <= 30; i += 1) {
    	const clone = div.cloneNode(true);
    	clone.setAttribute('data-score', scoreList[Math.floor(Math.random() * 3)]);
	    view.bricks.appendChild(clone);
    }

    const arenaRect = view.arena.getBoundingClientRect();
    const paddleLeft = view.paddle.offsetLeft;
    const paddleWidth = view.paddle.offsetWidth + 2;

    function stop() {
    	document.removeEventListener('mousemove', onMouseMove, false);
    }

    function onMouseDown(e) {
    	document.addEventListener('mousemove', onMouseMove, false);
    }

    function onMouseMove(e) {
    	const x = e.pageX;
    	let left;
    	if (arenaRect.left < x) {
    		if (x < arenaRect.right - paddleWidth) {
				 left = x - arenaRect.left;
			} else {
				left = arenaRect.width - paddleWidth + 'px';
			}
		}

		view.paddle.style.left = left + 'px';
	}

    view.paddle.addEventListener('mousedown', onMouseDown, false);
    view.paddle.addEventListener('mouseup', stop, false);

    document.documentElement.addEventListener('click', stop, false);
}());