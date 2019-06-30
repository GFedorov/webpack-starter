import '../styles/index.scss';
function interSect(obj1,obj2,destination) {
 var deltaX = Math.abs(obj1.x-obj2.x);
 var deltaY = Math.abs(obj1.y-obj2.y);
 return (deltaX**2 + deltaY**2)<destination**2;
}
function createMonster(stageEl) {
    var x = 400;
    var y = 200;
    var monster = new Monster('idblob',stageEl,x,y);
    return monster;
}
function Monster(id, stageEl, x, y, speed) {
  var me = this;
  var el = document.createElement('div');
  el.setAttribute('id', id);
  el.setAttribute('class', 'monster');
  stageEl.appendChild(el);
  this.x = x;
  this.y = y;
  this.speed = speed || 10;
  // this.moveToObject = function(targetObject) {
  //   var deltaX = targetObject.x - me.x;
  //   var deltaY = targetObject.y - me.y;
  //   if (deltaX < 0) {
  //     me.x -= me.speed;
  //   } else {
  //     me.x += me.speed;
  //   }
  //   if (deltaY < 0) {
  //     me.y -= me.speed;
  //   } else {
  //     me.y += me.speed;
  //   }
  // }
  this.destroy = function() {
    el.classList.add("fired");
    setTimeout(function() {
      stageEl.removeChild(el);
    }, 1000);
  };
  this.draw = function() {

    el.style.left = this.x  + 'px';
    el.style.top = this.y  + 'px';
  };
  this.draw();
}
//main script

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
    var hitRound = document.querySelector('.hit-area'); 
    var backgroundPosX = 0;
    var backgroundPosY = 0;
    var deltaPosX = 0;
    var deltaPosY = 0;
    var speedKoeff = 0.1;

    console.log({centerX, centerY});
   var monster =  createMonster(gameWorld);

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
        if(interSect({x:-backgroundPosX + centerX, y:-backgroundPosY + centerY},monster,70)){
            monster.destroy();
        }
        setTimeout(function(){
            mainHero.classList.remove('fight');
        },300);
    };

    console.log(centerX);
    setInterval(function() {
        backgroundPosX = backgroundPosX - Math.round(deltaPosX);
        backgroundPosY = backgroundPosY - Math.round(deltaPosY);
        
        hitRound.style.left = -backgroundPosX + centerX + 'px';
        hitRound.style.top = -backgroundPosY + centerY + 'px';
        gameWorld.style.transform = 'translate('+ backgroundPosX + 'px, '+ backgroundPosY + 'px)' ;
        
    }, 50);
});
