import{interSect} from './helper.js';

function Hero(worldEl, stageEl, x, y) {
    this.x = x;
    this.y = y;
    var heroEl = document.createElement('div');
    heroEl.setAttribute('id', 'hero');
    heroEl.setAttribute('class', 'main-hero');
    var sword = document.createElement('div');
    sword.setAttribute('id', 'sword');
    sword.setAttribute('class', 'sword');
    heroEl.appendChild(sword);
    var hitRound = document.querySelector('.hit-area');
    var backgroundPosX = 0;
    var backgroundPosY = 0;
    var deltaPosX = 0;
    var deltaPosY = 0;
    var speedKoeff = 0.1;
    var stageCoords = stageEl.getBoundingClientRect();
    var centerX = Math.round(stageCoords.width / 2);
    var centerY = Math.round(stageCoords.height / 2);
    this.moveEvent = function(event) {
        deltaPosX = (event.clientX - stageCoords.x - centerX) * speedKoeff;
        deltaPosY = (event.clientY - stageCoords.y - centerY) * speedKoeff;
        var angleTangens = deltaPosY / deltaPosX;
        var angle = Math.atan(angleTangens) * 180 / Math.PI;
        if (deltaPosX < 0) {
            angle = angle + 180;
        }
        angle = angle - 90;
        heroEl.style.transform = 'translate(-50%,-50%) rotate(' + angle + 'deg)';
    };
    this.fight = function() {
        heroEl.classList.add('fight');
        setTimeout(function() {
            heroEl.classList.remove('fight');
        }, 300);

    };
    this.checkMonster = function(monster) {
        if (interSect({ x: -backgroundPosX + centerX, y: -backgroundPosY + centerY }, monster, 70)) {
            monster.destroy();
        }

    };
    this.checkWeapon = function(weapon) {
        if (interSect({ x: -backgroundPosX + centerX, y: -backgroundPosY + centerY }, weapon, 70)) {
            var dubina = document.createElement('div');
            dubina.setAttribute('id', 'dubina');
            dubina.setAttribute('class', 'dubina');
            heroEl.removeChild(sword);
            heroEl.appendChild(dubina);
            weapon.destroy();
        }

    };
    this.changeWorld = function() {
        backgroundPosX = backgroundPosX - Math.round(deltaPosX);
        backgroundPosY = backgroundPosY - Math.round(deltaPosY);

        hitRound.style.left = -backgroundPosX + centerX + 'px';
        hitRound.style.top = -backgroundPosY + centerY + 'px';
        worldEl.style.transform = 'translate(' + backgroundPosX + 'px, ' + backgroundPosY + 'px)';

    };

    stageEl.appendChild(heroEl);

}

function createMonster(stageEl, x, y, monsters) {
    var monster = new Monster('blob'+monsters.length, stageEl, x, y);
    monsters.push(monster);
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

        el.style.left = this.x + 'px';
        el.style.top = this.y + 'px';
    };
    this.draw();
}

export {
Hero, createMonster, Monster
};