function arkanoid() {

    const game = document.getElementById('arkanoid');
    const arena = game.querySelector('[ref="arena"]');
    const bricks = game.querySelector('[ref="bricks"]');
    const paddle = game.querySelector('[ref="paddle"]');
    const ball = game.querySelector('[ref="ball"]');

    const lifes = game.querySelector('[ref="lifes"]');
    const score = game.querySelector('[ref="score"]');

    const div = document.createElement('div');
    div.classList.add('brick');

    const bs = [1, 3, 5];

    for (let i = 1; i <= 30; i += 1) {

        let clone = div.cloneNode(true);

        clone.setAttribute('data-score', bs[(Math.floor(Math.random() * 3))]);

        bricks.appendChild(clone);
    }

    let lifesCounter = 3;
    let scoreNumber = 0;

    lifes.innerHTML = lifesCounter;
    score.innerHTML = scoreNumber;

    const arenaRect = arena.getBoundingClientRect();
    const paddleWidth = paddle.offsetWidth;
    const paddleTop = paddle.offsetTop;
    const ballDiameter = ball.offsetHeight;
    const bricksTop = bricks.offsetTop;
    const bricksBottom = bricksTop + bricks.offsetHeight;

    const PBY = paddleTop - ballDiameter;

    let paddleLeft = 0;
    let paddleRight = paddleLeft + paddleWidth;

    let deltaX = 1;
    let deltaY = -1;


    let ballTimerID = 0;


    function reset() {
        if (0 === lifesCounter) {
            alert('Game over');
            lifesCounter = 3;
            lifes.innerHTML = lifesCounter;
        }

        clearInterval(ballTimerID);
        document.removeEventListener('mousemove', onMouseMove, false);

        paddle.style.left = Math.round((arenaRect.width - paddleWidth) / 2) + 'px';

        ball.style.left = Math.round((arenaRect.width - ballDiameter) / 2) + 'px';
        ball.style.top = PBY + 'px';
    }

    function startBall() {
        ballTimerID = setInterval(function () {
            const ballTop = ball.offsetTop + deltaY;
            const ballLeft = ball.offsetLeft + deltaX;

            paddleRight = paddleLeft + paddleWidth;

            ball.style.top = ballTop + 'px';
            ball.style.left = ballLeft + 'px';

            if (PBY < ballTop && ballLeft >= paddleLeft && ballLeft <= paddleRight) {
                deltaY = -1;
            } else if (arenaRect.height - ballDiameter < ballTop) {
                deltaY = -1;
                lifesCounter -= 1;
                lifes.innerHTML = lifesCounter;
                reset();
            } else if (0 >= ballTop) {
                deltaY = 1;
            }

            if (arenaRect.width - ballDiameter < ballLeft) {
                deltaX = -1;
            } else if (0 >= ballLeft) {
                deltaX = 1;
            }

            if (ballTop >= bricksTop && ballTop <= bricksBottom) {
                let elem = document.elementFromPoint(arenaRect.left + ballLeft, arenaRect.top + ballTop);
                if (elem.classList.contains('brick') /* && !elem.classList.contains('hide')*/ ) {
                    let s = Number.parseInt(elem.getAttribute('data-score'), 10) || 1;
                    scoreNumber += s;
                    score.innerHTML = scoreNumber;

                    elem.classList.add('hide');
                    deltaY *= -1;
                }
            }
        }, 1000 / 500);
    }

    const onMouseMove = function (e) {
        const X = e.pageX;

        if (arenaRect.left < X) {
            if (X < arenaRect.right - paddleWidth) {
                paddleLeft = X - arenaRect.left;
            } else {
                paddleLeft = arenaRect.width - paddleWidth;
            }
        }

        //console.log(arenaRect.left, arenaRect.right, e.pageX);

        paddle.style.left = paddleLeft + 'px';

        paddle.style.backgroundColor = '#0000ff';
    };


    paddle.addEventListener('mousedown', function (e) {
        document.addEventListener('mousemove', onMouseMove, false);

        startBall();
    }, false);

    reset();
}


document.addEventListener('DOMContentLoaded', arkanoid, false);
