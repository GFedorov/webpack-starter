import '../styles/index.scss';

window.addEventListener('load', function() {
    var stage = document.getElementById('stage');
    var stageCoords = stage.getBoundingClientRect();
    var centerX = Math.round(stageCoords.width / 2);
    var centerY = Math.round(stageCoords.height / 2);

    var mainHero = document.createElement('div');
    mainHero.setAttribute('id', 'hero');
    mainHero.setAttribute('class', 'main-hero');
    stage.appendChild(mainHero);

    var gameWorld = document.getElementById('gameworld');

    var backgroundPosX = 0;
    var backgroundPosY = 0;
    var deltaPosX = 0;
    var deltaPosY = 0;
    var speedKoeff = 0.1;

    console.log({centerX, centerY});

    stage.onmousemove = function(event) {
        //console.log((event.offsetX - centerX) + ':' + (event.offsetY - centerY));
        deltaPosX = (event.offsetX - centerX) * speedKoeff;
        deltaPosY = (event.offsetY - centerY) * speedKoeff;
        //gameWorld.style.transform = 'translate('+ backgroundPosX + 'px, '+ backgroundPosY + 'px)';
        stage.style.backgroundPosition = backgroundPosX + 'px' + backgroundPosY + 'px';
        var angleTangens = (event.offsetY - centerY) / (event.offsetX - centerX);
        var angle = Math.atan(angleTangens) * 180 / Math.PI;
        mainHero.style.transform = 'translate(-50%,-50%) rotate(' + angle + 'deg)';
    };

    console.log(centerX);
    setInterval(function() {
        backgroundPosX = backgroundPosX - Math.round(deltaPosX);
        backgroundPosY = backgroundPosY - Math.round(deltaPosY);
        

        // gameWorld.style.transform = 'translate('+ backgroundPosX + 'px, '+ backgroundPosY + 'px)' ;
        stage.style.backgroundPosition = backgroundPosX + 'px ' + backgroundPosY + 'px';
    }, 50);
});