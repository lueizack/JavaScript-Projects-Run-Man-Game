score = 0;
cross = true;

audio = new Audio ('music.mp3');
audiogo = new Audio ('gameover.mp3');

setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function(e){
    console.log("Key code is: ", e.keyCode);
    if(e.keyCode == 38 || e.keyCode == 87){
        man = document.querySelector('.man');
        man.classList.add('animateMan');
        setTimeout( () =>{
            man.classList.remove('animateMan');
        },700);
    }

    if(e.keyCode == 39 || e.keyCode == 68){
        man = document.querySelector('.man');
        manX = parseInt(window.getComputedStyle(man,null).getPropertyValue('left'));
        man.style.left = (manX + 112) +"px";
    }

    if(e.keyCode == 37 || e.keyCode == 65){
        man = document.querySelector('.man');
        manX = parseInt(window.getComputedStyle(man,null).getPropertyValue('left'));
        man.style.left = (manX - 112) +"px";
    }  
}

setInterval(() => {
    man = document.querySelector('.man');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    manX = parseInt(window.getComputedStyle(man,null).getPropertyValue('left'));
    manY = parseInt(window.getComputedStyle(man,null).getPropertyValue('top'));
    
    obstacleX = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    obstacleY = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

    offsetX = Math.abs(manX - obstacleX);
    offsetY = Math.abs(manY - obstacleY);

    console.log(offsetX,offsetY); 
    
    if(offsetX < 93 && offsetY < 90){
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        gameOver.style.color = 'red';
        scoreCont.style.color = 'red';
        obstacle.classList.remove('obstacleAnimation');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 3000);
    }
    else if (offsetX < 120 && cross){
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout( () => {
            cross = true; 
        }, 1000);
        setTimeout(() => {
            aniDuration = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDuration = aniDuration - 0.1;
            obstacle.style.animationDuration = newDuration + 's'; 
        }, 750);
    }
     
}, 10);


function updateScore(score){
    scoreCont.innerHTML = "Your Score : "+ score;
}