/*
Created by http://benmoren.com
Some functions and code modified version from http://www.jeffreythompson.org/collision-detection
GNU LGPL 2.1 License
Version 0.1 | January 10th, 2016
*/
console.log("### p5.collide ###")

p5.prototype._collideDebug = false;

p5.prototype.collideDebug = function(debugMode){
    _collideDebug = debugMode;
}

/*~++~+~+~++~+~++~++~+~+~ 2D ~+~+~++~+~++~+~+~+~+~+~+~+~+~+~+*/

p5.prototype.collideCircleCircle = function (x, y,d, x2, y2, d2) {
//2d
  if( dist(x,y,x2,y2) <= (d/2)+(d2/2) ){
    return true;
  }
  return false;
};
