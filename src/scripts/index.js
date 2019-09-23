import '../styles/index.scss';
import { Hero, createMonster, Monster } from './monster.js';
import { createWeapon, Weapon, getRandomWeapon,weapons } from './weapon.js';
import {Game} from './game.js';
//main script;

window.addEventListener('load', function() {
    var stage = document.getElementById('stage');
    var gameWorld = document.getElementById('gameworld');
    var game = new Game(stage, gameWorld);

    game.updateInventory(weapons.dubina.className,weapons.dubina.info);

    var hero = new Hero(game, stage, 0, 0);
    var monsters = [];
    for (var i = 0; i < 20; i++) {
        createMonster(gameWorld, Math.floor(Math.random() * game.w), Math.floor(Math.random() * game.h), i % 5, monsters);
    }
    /* createMonster(gameWorld, 200, 400, monsters);
    createMonster(gameWorld, 480, 600, monsters);
    createMonster(gameWorld, 80, 40, monsters);
*/
    var weapons = [];
    for (var i = 0; i < 6; i++) {
        createWeapon(gameWorld, getRandomWeapon(), Math.floor(Math.random() * game.w), Math.floor(Math.random() * game.h), weapons);
    }


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
    setInterval(function() {
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
});