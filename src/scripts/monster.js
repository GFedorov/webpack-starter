import { interSect } from './helper.js';
import {Weapon} from './weapon.js';

function Hero(game, stageEl, x, y) {
    var worldEl = game.gameWorld;
    var me = this;
    this.x = x;
    this.y = y;
    var hitRound = document.querySelector('.hit-area');
    var heroEl = document.createElement('div');
    heroEl.setAttribute('id', 'hero');
    heroEl.setAttribute('class', 'main-hero');
    var backgroundPosX = 0;
    var backgroundPosY = 0;
    var deltaPosX = 0;
    var deltaPosY = 0;
    var speedKoeff = 0.03;
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
        if (interSect({ x: -backgroundPosX + centerX, y: -backgroundPosY + centerY }, monster, me.weapon.settings.radius)) {
            monster.destroy();
        }

    };
    this.pickWeapon = function(weapon){
        var el = document.createElement('div');
            el.setAttribute('id', weapon.id);
            el.setAttribute('class', weapon.settings.className);
            stageEl.appendChild(el);
            heroEl.innerHTML = '';
            heroEl.appendChild(el);
            me.weapon = weapon;
            hitRound.style.width = me.weapon.settings.radius * 2 + 'px';
            hitRound.style.height = me.weapon.settings.radius * 2 + 'px';
            weapon.destroy();

    };
    this.checkWeapon = function(weapon) {
        if (interSect({ x: -backgroundPosX + centerX, y: -backgroundPosY + centerY }, weapon, me.weapon.settings.radius)) {
            me.pickWeapon(weapon);
            }

    };
    this.changeWorld = function() {
        backgroundPosX = backgroundPosX - Math.round(deltaPosX);
        backgroundPosY = backgroundPosY - Math.round(deltaPosY);
        console.log(backgroundPosX,backgroundPosY);
        if(backgroundPosX > game.stageWidth/2){             
            backgroundPosX = game.stageWidth/2;
        }
        if(backgroundPosY > game.stageHeight/2){             
            backgroundPosY = game.stageHeight/2;
        }
        if(backgroundPosX < -game.w + game.stageWidth/2){             
            backgroundPosX = -game.w + game.stageWidth/2;
        }
        if(backgroundPosY < -game.h + game.stageHeight/2){             
            backgroundPosY = -game.h + game.stageHeight/2;
        }
        hitRound.style.left = -backgroundPosX + centerX + 'px';
        hitRound.style.top = -backgroundPosY + centerY + 'px';
        worldEl.style.transform = 'translate(' + backgroundPosX + 'px, ' + backgroundPosY + 'px)';

    };
    var weapon = new Weapon('weapon', worldEl, this.x, this.y, 'dubina');
    this.pickWeapon(weapon);
    stageEl.appendChild(heroEl);

}

function createMonster(stageEl, x, y, monsters) {
    var monster = new Monster('blob' + monsters.length, stageEl, x, y);
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
    Hero,
    createMonster,
    Monster
};