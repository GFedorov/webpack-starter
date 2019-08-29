function interSect(obj1, obj2, destination) {
    var deltaX = Math.abs(obj1.x - obj2.x);
    var deltaY = Math.abs(obj1.y - obj2.y);
    return (Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) < Math.pow(destination, 2);
}
const getAngle = (deltaX, deltaY) => {
    var angleTangens = deltaY / deltaX;
    var angle = Math.atan(angleTangens) * 180 / Math.PI;
    if (deltaX < 0) {
        angle = angle + 180;
    }
    return angle;
};
const checkAngle = (hero, dot, heroAngle, deltaAngle) => {
    const deltaX = dot.x - hero.x;
    const deltaY = dot.y - hero.y;
    const monsterAngle = getAngle(deltaX, deltaY);
    return Math.abs(monsterAngle - heroAngle) <= deltaAngle;

};
export {
    interSect,
    getAngle,
    checkAngle
};