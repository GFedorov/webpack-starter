import { interSect, getAngle,checkAngle } from './helper.js';
import {Weapon} from './weapon.js';


function Hero(game, stageEl, x, y) {
    var worldEl = game.gameWorld;
    var me = this;
    this.x = x;
    this.y = y;
    this.xp = 0;
    var hitRound = document.querySelector('.hit-area');
    var heroEl = document.createElement('div');
    heroEl.setAttribute('id', 'hero');
    heroEl.setAttribute('class', 'main-hero');
    var xpEl = document.querySelector('#info .hero-xp');
    var levelEl = document.querySelector('#info .hero-level');
    var backgroundPosX = 0;
    var backgroundPosY = 0;
    var deltaPosX = 0;
    var deltaPosY = 0;
    var speedKoeff = 0.03;
    var stageCoords = stageEl.getBoundingClientRect();
    var centerX = Math.round(stageCoords.width / 2);
    var centerY = Math.round(stageCoords.height / 2);
    var heroAngle = 0;
    this.coordStageUpd = function(){
        stageCoords = stageEl.getBoundingClientRect();
        centerX = Math.round(stageCoords.width / 2);
        centerY = Math.round(stageCoords.height / 2);
    };
    this.moveEvent = function(event) {
        deltaPosX = (event.clientX - stageCoords.x - centerX) * speedKoeff;
        deltaPosY = (event.clientY - stageCoords.y - centerY) * speedKoeff;
        heroAngle = getAngle(deltaPosX, deltaPosY);
        heroEl.style.transform = 'translate(-50%,-50%) rotate(' + heroAngle + 'deg)';
    };
    this.fight = function() {
        heroEl.classList.add('fight');
        setTimeout(function() {
            heroEl.classList.remove('fight');
        }, 300);

    };
    this.checkMonster = function(monster) {
        if (interSect({ x: -backgroundPosX + centerX, y: -backgroundPosY + centerY }, monster, me.weapon.settings.radius)) {
            if ( checkAngle({ x: -backgroundPosX + centerX, y: -backgroundPosY + centerY }, monster, heroAngle, me.weapon.settings.angle)){
                me.updateXP(monster.damage(me.weapon.settings.damage));
            }

        };

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
            setTimeout(function(){
                me.pickWeapon(weapon);
            }, 300);
        }

    };
    this.getLevel = function(){
        return Math.floor(Math.log(Math.floor(me.xp/100))/Math.log(2));
    };
    this.updateXP = function(score){
        if (!score) {
            return;
        };
        me.xp+=score;
        xpEl.innerHTML = me.xp;
        levelEl.innerHTML = me.getLevel();
        };
    this.changeWorld = function() {
        console.log(- backgroundPosX + 300, -backgroundPosY + 200);
        backgroundPosX = backgroundPosX - Math.round(deltaPosX);
        backgroundPosY = backgroundPosY - Math.round(deltaPosY);
       
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
    this.getPosX = function(){
        return - backgroundPosX + 300;
    };
    this.getPosY = function(){
        return -backgroundPosY + 200;
    };
    var weapon = new Weapon('weapon', worldEl, this.x, this.y, 'dubina');
    this.pickWeapon(weapon);
    stageEl.appendChild(heroEl);
    
    


}

function createMonster(stageEl, x, y,speed, monsters) {
    var monster = new Monster('blob' + monsters.length, stageEl, x, y,speed);
    monsters.push(monster);
    return monster;
}

function Monster(id, stageEl, x, y, speed) {
    var me = this;
    var el = document.createElement('div');
    var elHealthWrapper = document.createElement('div');
       elHealthWrapper.setAttribute('class', 'health'); 
    var elHealthBar = document.createElement('div');
       elHealthBar.setAttribute('class', 'health-bar');
       el.appendChild(elHealthWrapper); 
       elHealthWrapper.appendChild(elHealthBar);


    el.setAttribute('id', id);
    el.setAttribute('class', 'monster');
    stageEl.appendChild(el);
    this.x = x;
    this.y = y;
    this.hp = 100;
    this.speed = speed || 10;
    var monsterAngle = 0;
    var deltaPosX = 0;
    var deltaPosY = 0;
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
    this.moveEvent = function(hero) {
        deltaPosX = me.x - hero.getPosX();
        deltaPosY = me.y - hero.getPosY();
        monsterAngle = getAngle(deltaPosX, deltaPosY) + 180;
        el.style.transform = 'translate(-50%,-50%) rotate(' + monsterAngle + 'deg)';
    };
    this.damage = function(points){
        me.hp -= points;
        if (me.hp <= 0){
            me.destroy();
            return 100;    
        }else {
            me.drawHP();
            return 0;
        }
    };
    this.destroy = function() {
        el.classList.add("fired");
        setTimeout(function() {
            stageEl.removeChild(el);
        }, 1000);
    };
    this.drawHP = function() {
      elHealthBar.style.width = me.hp + '%';
        
    };
    this.move = function(hero){
        me.moveEvent(hero);
        me.x-= deltaPosX * 0.01 * me.speed;
        me.y-= deltaPosY * 0.01 * me.speed;
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