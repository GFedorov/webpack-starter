function interSect(obj1, obj2, destination) {
    var deltaX = Math.abs(obj1.x - obj2.x);
    var deltaY = Math.abs(obj1.y - obj2.y);
    return (Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) < Math.pow(destination, 2);
}
export{
	interSect
};