import '../styles/index.scss';
var stage = document.getElementById('stage')
var mainHero = document.createElement('div');
mainHero.setAttribute('id', 'hero');
mainHero.setAttribute('class', 'main-hero');
stage.appendChild(mainHero);
var centerX = 300;
var centerY = Math.round(stage.clientHeight / 2);
var backgroundPosX = 0;
var backgroundPosY = 0;
var deltaPosX = 0;
var deltaPosY = 0;

stage.onmousemove = function(event) {
    console.log((event.offsetX - centerX) + ':' + (event.offsetY - centerY))
    deltaPosX = (event.offsetX - centerX);
    deltaPosY = (event.offsetY - centerY);
    stage.style.backgroundPosition = backgroundPosX + 'px ' + backgroundPosY + 'px';
    var angleTangens = (event.offsetY - centerY) / (event.offsetX - centerX);
    var angle = Math.atan(angleTangens) * 360 / Math.PI + 90;
    mainHero.style.transform = 'translate(-50%,-50%) rotate(' + angle + 'deg)';

}

console.log(centerX);
setInterval(function() {
	backgroundPosX+=deltaPosX
	backgroundPosY+=deltaPosY

    stage.style.backgroundPosition = backgroundPosX + 'px ' + backgroundPosY + 'px';

}, 200)

console.log('webpack starterkit');