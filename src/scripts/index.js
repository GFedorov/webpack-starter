import '../styles/index.scss';
import { Hero, createMonster, Monster } from './monster.js';
import { createWeapon, Weapon, getRandomWeapon,getWeapons } from './weapon.js';
import {Game} from './game.js';
//main script;

window.addEventListener('load', function() {
    var stage = document.getElementById('stage');
    var gameWorld = document.getElementById('gameworld');
    var monsters = [];
    var weapons = [];
    var game = new Game(stage, gameWorld, monsters);
    var hero = new Hero(game, stage, 0, 0);

    var dubina = getWeapons()['dubina'];
    game.updateInventory(dubina.className,dubina.info);

    stage.onmousemove = function(event) {
        hero.moveEvent(event);
    };

    stage.onclick = function() {
        hero.fight();
        for (var i = 0; i < monsters.length; i++) {
            hero.checkMonster(monsters[i]);
        }
        for (var i = 0; i < weapons.length; i++) {
            hero.checkWeapon(weapons[i]);
        }
    };

    setInterval(function() {
        if (game.active != true){
            return false;
        }
        hero.changeWorld();
        for (var i = 0; i < monsters.length; i++) {
            monsters[i].move(hero);
            monsters[i].draw();
        }
    }, 50);

    var interval1 = setInterval(function() {
        if (game.active != true){
            return false;
        }
        for (var i = 0; i < monsters.length; i++) {
            monsters[i].fight(hero);
        }
    }, 1000);

    window.onresize = function() {
        hero.coordStageUpd();
    };

    function newLevel(monstersCount, weaponsCount) {
        for (var i = 0; i < monstersCount; i++) {
            createMonster(gameWorld, Math.floor(Math.random() * game.w), Math.floor(Math.random() * game.h), i % 5, monsters, game);
        }

        for (var i = 0; i < weaponsCount; i++) {
            createWeapon(gameWorld, getRandomWeapon(), Math.floor(Math.random() * game.w), Math.floor(Math.random() * game.h), weapons);
        }
    }

    newLevel(3, 16);
    game.nextLevel = function() {
        newLevel(10, 5);
    }
});