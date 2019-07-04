function createWeapon(stageEl) {
	var x = 100;
	var y = 200;
	var weapon = new Weapon('Dubina',stageEl,x,y);
}
function Weapon(id, stageEl, x, y, speed) {
  var me = this;
  var el = document.createElement('div');
  el.setAttribute('id', id);
  el.setAttribute('class', 'weapon');
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
    el.setAttribute("class", "fired");
    setTimeout(function() {
      stageEl.removeChild(el);
    }, 1000)
  }
  this.draw = function() {

    el.style.left = this.x  + 'px';
    el.style.top = this.y  + 'px';
  }
  this.draw();
}
alert('Hello')