(function () {
    // pobieranie elementu kontenera gry poprzez ID
    const arkanoidWrapper = document.querySelector('#arkanoid');
    // mozna tez tak: const arkanoidWrapper = document.getElementById('arkanoid');

    // wybranie wszystkich elementów o atrybucie ref z kontenera gry
    const refElements = arkanoidWrapper.querySelectorAll('[ref]');

    // obiekt przechowujacy referencje do elementow interface dom wybranych i przechowywanych w kolekcji refElements
    const view = {};

    const scoreList = [1, 3, 5];

    let lifes = 3;
    let score = 0;

    [].forEach.call(refElements, function (refElement) {
        const name = refElement.getAttribute('ref');
        if (name) {
            view[name] = refElement;
        }
    });

    view.lifes.innerHTML = lifes;
    view.score.innerHTML = score;

    /*const div = document.createElement('div');
    div.classList.add('brick');


    for (let i = 1; i <= 30; i += 1) {
        const clone = div.cloneNode(true);
        clone.setAttribute('data-score', scoreList[Math.floor(Math.random() * 3)]);
        view.bricks.appendChild(clone);
    }*/

    function createBricks(count = 30, scoreList = [1, 3, 5]) {
        let outback = "";

        for (let i = 1; i <= count; i += 1) {
            outback += '<div class="brick" data-score="' +
                scoreList[Math.floor(Math.random() * 3)] +
                '"></div>';

            // outback += `<div class="brick" data-score="${scoreList[Math.floor(Math.random() * 3)]}"></div>`;
        }

        return function (insertTo) {
            insertTo.innerHTML = outback;
        };
    }

    createBricks(50, [3, 5, 7])(view.bricks);

    const arenaRect = view.arena.getBoundingClientRect();
    const paddleTop = view.paddle.offsetTop;

    const paddleWidth = view.paddle.offsetWidth + 2;
    const ballDiameter = view.ball.offsetHeight;
    const paddleBoomY = paddleTop - ballDiameter;

    const bricksTop = view.bricks.offsetTop;
    const bricksBottom = bricksTop + view.bricks.offsetHeight;

    let paddleLeft;
    let ballTop;
    let ballLeft;
    let deltaX;
    let deltaY;

    reset();

    function startBall() {
        let timeUID = setInterval(function () {
            ballTop += 1 * deltaY;
            ballLeft += 1 * deltaX;
            view.ball.style.top = ballTop + 'px';
            view.ball.style.left = ballLeft + 'px';

            if (paddleTop - ballDiameter < ballTop &&
                paddleLeft <= ballLeft &&
                paddleLeft + paddleWidth >= ballLeft) {

                deltaY = -1;
            } else if (ballTop >= arenaRect.height - ballDiameter) {
                deltaY = -1;
                lifes -= 1;
                view.lifes.innerHTML = lifes;

                if (lifes === 0) {
                    clearInterval(timeUID);
                    window.alert('GAME OVER');
                    reset();
                    return;
                }
            } else if (ballTop <= 0) {
                deltaY = 1;
            }

            if (arenaRect.width - ballDiameter <= ballLeft) {
                deltaX = -1;
            } else if (ballLeft <= 0) {
                deltaX = 1;
            }

            if (bricksTop <= ballTop && ballTop <= bricksBottom) {
                let element = document.elementFromPoint(
                    arenaRect.left + ballLeft,
                    arenaRect.top + ballTop
                );
                if (element.classList.contains("brick")) {
                    let brickScore = Number.parseInt(
                        element.getAttribute('data-score'), 10
                    );
                    // let brickScore = Number(element.dataset.score);

                    score += brickScore;
                    // score = score + brickScore;
                    view.score.innerHTML = score;

                    element.classList.add('hide');

                    deltaY *= -1;
                }
            }
        }, 1000 / 500);
    }

    function stop() {
        document.removeEventListener('mousemove', onMouseMove, false);
    }

    function onMouseDown(e) {
        document.addEventListener('mousemove', onMouseMove, false);

        startBall();
    }

    function onMouseMove(e) {
        const x = e.pageX;

        if (arenaRect.left < x) {
            if (x < arenaRect.right - paddleWidth) {
                paddleLeft = x - arenaRect.left;
            } else {
                paddleLeft = arenaRect.width - paddleWidth + 'px';
            }
        }

        view.paddle.style.left = paddleLeft + 'px';
    }

    view.paddle.addEventListener('mousedown', onMouseDown, false);
    view.paddle.addEventListener('mouseup', stop, false);

    document.documentElement.addEventListener('click', stop, false);


    function reset() {
        stop();

        lifes = 3;
        score = 0;

        paddleLeft = ((arenaRect.width - paddleWidth) / 2);
        ballTop = paddleTop - ballDiameter;
        ballLeft = paddleLeft + ((paddleWidth - ballDiameter) / 2);
        deltaX = -1;
        deltaY = -1;


        view.paddle.style.left = paddleLeft + 'px';
        view.ball.style.top = ballTop + 'px';
        view.ball.style.left = ballLeft + 'px';
    }
}());