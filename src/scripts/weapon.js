function createWeapon(stageEl, type, x, y, weapons) {
    var weapon = new Weapon('weapon'+weapons.length, stageEl, x, y, type);
    weapons.push(weapon);
    return weapon;
}
const weapons = {
    sword: {
        className: 'sword',
        radius: 85,
        damage: 10,
        duration:300,

    },
    dubina: {
        className: 'dubina',
        radius: 115,
        damage: 20,
        duration:500,
    },
    catana: {
        className: 'catana',
        radius: 100,
        damage: 20,
        duration:200,
    }
};
function getRandomWeapon(){
var arWeapons = Object.keys(weapons);
var num = Math.floor(Math.random() * arWeapons.length);
return arWeapons[num];
}

function Weapon(id, stageEl, x, y, type) {
    var me = this;
    this.settings = weapons[type];
    var el = document.createElement('div');
    el.setAttribute('id', id);
    el.setAttribute('class', me.settings.className);
    stageEl.appendChild(el);
    this.x = x;
    this.y = y;
    this.id = id;  
    this.isActive = true  
    this.destroy = function() {
        el.setAttribute("class", "fired");
        setTimeout(function() {
            stageEl.removeChild(el);
            me.isActive = false;
            me.x = -100;
            me.y = -100;
        }, me.settings.duration);
    };
    this.draw = function() {

        el.style.left = this.x + 'px';
        el.style.top = this.y + 'px';
    };
    this.draw();
}


export {createWeapon, Weapon, getRandomWeapon};

