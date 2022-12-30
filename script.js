score = 0;
cross = true;
audiogo = new Audio('gameover.mp3');
audio = new Audio('music.mp3');
audio.volume=0.3;
audio.loop=true;
jump = new Audio('jump.mp3');
setTimeout(() => {
    audio.play();
}, 10);
document.onkeydown = function (e) {
    console.log("Key code is ", e.keyCode)
    if (e.keyCode == 38 || e.keyCode == 32) {
        tate = document.querySelector('.tate');
        tate.classList.add('animateTate');
        setTimeout(() => {
            tate.classList.remove('animateTate')
        }, 700);
        jump.play();

    }

    if (e.keyCode == 39) {
        tate = document.querySelector('.tate');
        tateX = parseInt(window.getComputedStyle(tate, null).getPropertyValue('left'));
        tate.style.left = (tateX + 80) + "px";

    }
    if (e.keyCode == 37) {
        tate = document.querySelector('.tate');
        tateX = parseInt(window.getComputedStyle(tate, null).getPropertyValue('left'));
        tate.style.left = (tateX - 80) + "px";

    }
}

setInterval(() => {
    tate = document.querySelector('.tate');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    tx = parseInt(window.getComputedStyle(tate, null).getPropertyValue('left'));
    ty = parseInt(window.getComputedStyle(tate, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(tx - ox);
    offsetY = Math.abs(ty - oy);
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "GAME OVER ☠️ - Reload To Start Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audio.pause();
        }, 100);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration', newDur);
        }, 500);


    }
}, 10);

function updateScore(score) {
    scoreCount.innerHTML = "YourScore: " + score;
}