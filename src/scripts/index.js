import '../styles/index.scss';

window.addEventListener('load', function() {
    var stage = document.getElementById('stage');
    var stageCoords = stage.getBoundingClientRect();
    var centerX = Math.round(stageCoords.width / 2);
    var centerY = Math.round(stageCoords.height / 2);

    var mainHero = document.createElement('div');
    mainHero.setAttribute('id', 'hero');
    mainHero.setAttribute('class', 'main-hero');
    var sword = document.createElement('div');
    sword.setAttribute('id', 'sword');
    sword.setAttribute('class', 'sword');
    mainHero.appendChild(sword);

    stage.appendChild(mainHero);

    var gameWorld = document.getElementById('gameworld');

    var backgroundPosX = 0;
    var backgroundPosY = 0;
    var deltaPosX = 0;
    var deltaPosY = 0;
    var speedKoeff = 0.1;

    console.log({centerX, centerY});

    stage.onmousemove = function(event) {
        deltaPosX = (event.clientX - stageCoords.x - centerX) * speedKoeff;
        deltaPosY = (event.clientY - stageCoords.y - centerY) * speedKoeff;
        var angleTangens = deltaPosY / deltaPosX;
        var angle = Math.atan(angleTangens) * 180 / Math.PI;
        if (deltaPosX < 0) {
            angle = angle + 180;
        }
        angle = angle - 90;
        mainHero.style.transform = 'translate(-50%,-50%) rotate(' + angle + 'deg)';
    };
    stage.onclick=function(){
        mainHero.classList.add('fight');
        setTimeout(function(){
            mainHero.classList.remove('fight');
        },300);
    };

    console.log(centerX);
    setInterval(function() {
        backgroundPosX = backgroundPosX - Math.round(deltaPosX);
        backgroundPosY = backgroundPosY - Math.round(deltaPosY);
        

        gameWorld.style.transform = 'translate('+ backgroundPosX + 'px, '+ backgroundPosY + 'px)' ;
        
    }, 50);
});