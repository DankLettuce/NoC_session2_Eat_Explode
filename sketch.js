var movers = [];
var collision = [];
var G = 1;

function setup() {
  createCanvas(800, 400);
  for (var i = 0; i < 10; i++) {
    movers[i] = new Particle(random(width), random(height), random(3), random(3), random(2, 8));
  }
}

function draw() {
  background(254,25,150);
  for (var i = 0; i < movers.length; i++) {
    for (var j = 0; j < movers.length; j++) {
      if (i !== j) {
        var force = movers[j].calculateAttraction(movers[i]);
        movers[i].applyForce(force);
      }

    }
  }

    for (var i = 0; i < movers.length; i++) {
      for (var j = i + 1; j < movers.length; j++) {
        if (collideCircleCircle(movers[i].pos.x, movers[i].pos.y, movers[i].widthHeight, movers[j].pos.x, movers[j].pos.y, movers[j].widthHeight) == true) {
          movers[i].mass += movers[j].mass;
          movers[i].vel.add(movers[j].vel);
          movers.splice(j, 1);
        }
      }
    
    movers[i].edges();
    movers[i].update();
    movers[i].display();

    if (movers.length <= 1) { //if all objects have combined and there is only 1 left, explode it into more
      reseed();
    }
  }
}

function reseed() {
  var numparticles = 10;
  for (var i = 0; i < numparticles; i++) { //create 10 particles
  //each particle will be randomly placed withing 150 pixels of the 'singularity' and given a random initial velocity + mass
    movers[i] = new Particle(movers[0].pos.x+random(-75,75) , movers[0].pos.y+random(-75,75) , random(-10,10), random(10,10), random(2, 8));
  }
}