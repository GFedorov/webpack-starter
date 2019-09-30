function Game(stage, gameWorld, monsters){
    var me = this;
    var xpEl = document.querySelector('#info .hero-xp');
    var levelEl = document.querySelector('#info .hero-level');
    var hpEl = document.querySelector('#info #hp-wrapper .bar');
    var invImg = document.querySelector('#inventory .img ');
    var invInfo = document.querySelector('#inventory .info');
    
    this.stage =  stage;
    this.gameWorld =  gameWorld;
    this.w =  1200;
    this.h =  1200;
    this.stageWidth =  600;
    this.stageHeight =  400;
    this.active  =  true;
  
    //@TODO - Move
    var restartElement = document.getElementById('restart');
    restartElement.onclick = function(){
        me.active = !me.active;
        if (game.active) {
            restartElement.innerHTML = "Stop";
        }
        else{ 
            restartElement.innerHTML = "Start";
        }

    };
    var popup = document.getElementById('popup');
    this.showPopup = function(popupText, callback){
        popup.style.display = 'block';
        me.active = false;
        popup.innerHTML = `<div>${popupText} </div>`;
        popup.onclick = function (){
            popup.style.display = 'none';
            callback();
        };


    }; 
    this.updateXP = function(xp){
        xpEl.innerHTML = xp;
    };
    this.updateLevel = function(level){
        levelEl.innerHTML = level;
    };
    this.updateHp = function(hp){
        hpEl.style.width = hp + '%';
    };
    this.updateInventory = function(img, info){
        invImg.innerHTML = `<img src = "/src/img/${img}.png"/>`;
        invInfo.innerHTML = info;
    };
    this.nextLevel = () => {
        console.log('End of game');
    }
    this.monsterDied = function (monster) {
        console.log('monster died');
        let count = 0;
        monsters.forEach(monster => {
            if(monster.active) {
                count++;
            }
        });
        if(!count) {
            me.nextLevel();
        }
    }
}
export {Game};