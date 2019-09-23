import { interSect, getAngle, checkAngle } from './helper.js';
import { Weapon } from './weapon.js';


function Hero(game, stageEl, x, y) {
    var worldEl = game.gameWorld;
    var me = this;
    this.x = x;
    this.y = y;
    this.xp = 0;
    this.hp = 100;
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
    this.coordStageUpd = function() {
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
            if (checkAngle({ x: -backgroundPosX + centerX, y: -backgroundPosY + centerY }, monster, heroAngle, me.weapon.settings.angle)) {
                me.updateXP(monster.damage(me.weapon.settings.damage));
            }

        };

    };
    this.pickWeapon = function(weapon) {
        if(!weapon.isActive){
            return false;
        }
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
            setTimeout(function() {
                me.pickWeapon(weapon);
            }, 300);
        }

    };
    this.getLevel = function() {
        return Math.floor(Math.log(Math.floor(me.xp / 100)) / Math.log(2));
    };
    this.updateXP = function(score) {
        if (!score) {
            return;
        };
        me.xp += score;
        xpEl.innerHTML = me.xp;
        levelEl.innerHTML = me.getLevel();
    };
    this.changeWorld = function() {
        backgroundPosX = backgroundPosX - Math.round(deltaPosX);
        backgroundPosY = backgroundPosY - Math.round(deltaPosY);

        if (backgroundPosX > game.stageWidth / 2) {
            backgroundPosX = game.stageWidth / 2;
        }
        if (backgroundPosY > game.stageHeight / 2) {
            backgroundPosY = game.stageHeight / 2;
        }
        if (backgroundPosX < -game.w + game.stageWidth / 2) {
            backgroundPosX = -game.w + game.stageWidth / 2;
        }
        if (backgroundPosY < -game.h + game.stageHeight / 2) {
            backgroundPosY = -game.h + game.stageHeight / 2;
        }
        hitRound.style.left = -backgroundPosX + centerX + 'px';
        hitRound.style.top = -backgroundPosY + centerY + 'px';
        worldEl.style.transform = 'translate(' + backgroundPosX + 'px, ' + backgroundPosY + 'px)';

    };
    this.getPosX = function() {
        return -backgroundPosX + centerX;
    };
    this.getPosY = function() {
        return -backgroundPosY + centerY;
    };
    this.damage = function(points) {
        me.hp -= points;
        if (me.hp <= 0) {
            me.destroy();
            return 100;
        } else {
            //me.drawHP();
            return 0;
        }
    };
    this.destroy = function() {
        heroEl.classList.add("fired");
        game.showPopup('Game over', function(){
            //game.reload
        });
        setTimeout(function() {
            stageEl.removeChild(heroEl);
        }, 1000);
    };
    var weapon = new Weapon('weapon', worldEl, this.x, this.y, 'dubina');
    this.pickWeapon(weapon);
    stageEl.appendChild(heroEl);





}

function createMonster(stageEl, x, y, speed, monsters) {
    var monster = new Monster('blob' + monsters.length, stageEl, x, y, speed);
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
    this.active = true;


    el.setAttribute('id', id);
    el.setAttribute('class', 'blob');
    var monsterEl = document.createElement('div');
    monsterEl.setAttribute('class', 'monster');
    el.appendChild(monsterEl);

    stageEl.appendChild(el);
    this.x = x;
    this.y = y;
    this.hp = 100;
    this.speed = speed || 10;
    var monsterAngle = 0;
    var prevAngle = 0;
    var deltaPosX = 0;
    var deltaPosY = 0;
    this.damage = function(points) {
        if (!me.active){
            return false;
        }
        me.hp -= points;
        if (me.hp <= 0) {
            me.destroy();
            return 100;
        } else {
            me.drawHP();
            return 0;
        }
    };
    this.destroy = function() {
        if (!me.active){
            return false;
        }
        me.active = false;
        el.classList.add("fired");
        setTimeout(function() {
            stageEl.removeChild(el);
        }, 1000);
    };
    this.fight = function(hero){
        if (!me.active){
            return false;
        }
        if (!interSect({x:hero.getPosX(),y:hero.getPosY()}, me, 50)){
            console.log(false);
            return false ;
        }
        console.log(true);
        el.classList.add('hostile');
        setTimeout(function(){
            el.classList.remove('hostile');
        }, 500);
        hero.damage(2);
    };
    this.drawHP = function() {
        elHealthBar.style.width = me.hp + '%';

    };
    this.move = function(hero) {
        deltaPosX = hero.getPosX() - me.x;
        deltaPosY = hero.getPosY() - me.y;
        monsterAngle = getAngle(deltaPosX, deltaPosY);
        if (prevAngle
            && Math.abs(monsterAngle - prevAngle)>60
            && Math.abs(monsterAngle - prevAngle)<170
        ){
            monsterAngle = prevAngle;
        };
        prevAngle = monsterAngle;
        monsterEl.style.transform = 'rotate(' + monsterAngle + 'deg)';

        if(Math.abs(deltaPosX) < 10 && Math.abs(deltaPosY) < 10) {
            return;
        }

        me.x += me.speed * Math.abs(Math.cos(monsterAngle)) * (deltaPosX > 0 ? 1 : -1);
        me.y += me.speed * Math.abs(Math.sin(monsterAngle)) * (deltaPosY > 0 ? 1 : -1);
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