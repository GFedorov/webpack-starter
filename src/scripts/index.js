import '../styles/index.scss';
import {Hero, createMonster, Monster} from './monster.js';
import {createWeapon, Weapon} from './weapon.js';








//main script

window.addEventListener('load', function() {
    var stage = document.getElementById('stage');
    var gameWorld = document.getElementById('gameworld');
    var hero = new Hero(gameworld, stage, 0, 0);
    var monsters = [];
    createMonster(gameWorld, 300, 200, monsters);
    createMonster(gameWorld, 200, 400, monsters);
    createMonster(gameWorld, 480, 600, monsters);
    createMonster(gameWorld, 80, 40, monsters);

    var weapon = createWeapon(gameWorld);
    stage.onmousemove = function(event) {
        hero.moveEvent(event);

    };
    stage.onclick = function() {
        hero.fight();
        for (var i = 0; i< monsters.length ; i++) {
            hero.checkMonster(monsters[i]);
        }
        hero.checkWeapon(weapon);
    };

     setInterval(function() {
        hero.changeWorld();


    }, 50);
});