
function Particle(x, y, xvel, yvel, m){ //initialize particle
  this.pos = createVector(x, y);
  this.vel = createVector(xvel, yvel);
  this.acc = createVector(0, 0);
  this.mass = m;
  
  
  this.calculateAttraction = function(p) { //determine the attraction force
    // Calculate direction of force
    var force = p5.Vector.sub(this.pos, p.pos);
    // Distance between objects
    var distance = force.mag();
    // Artificial constraint
    distance = constrain(distance, 5, 25);
    // Normalize vector (distance doesn't matter here, we just want this vector for direction)
    force.normalize();
    // Calculate gravitional force magnitude
    var strength = (G * this.mass * p.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
  }
  
  this.applyForce = function(force){ //apply the attraction force
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }
  
  this.checkBoundaries = function(){ //check to see if particle is hitting a boundary and reverse velocity
    if(this.pos.x > width){
      this.pos.x = 0;
    }
    if(this.pos.x < 0){
      this.pos.x = width;
    }
    if(this.pos.y > height){
      this.pos.y = 0;
    }
    if(this.pos.y < 0){
      this.pos.y = height;
    }
  }
 
 
    this.collision = function(i,j){ //if two particles collide, add their velocities and masses into a single particle and remove one particle
    
        movers[i].mass += movers[j].mass;
        movers[i].vel.add(movers[j].vel);
        movers.splice(j,1);
      }
  
   this.update = function(){ //update the position, velocity, and reset acc.

    this.vel.add(this.acc);
//    this.vel.limit(30);
    this.pos.add(this.vel);
    this.acc.set(0,0);
  }
  
  this.display = function(){ //draw each ellipise
    fill(25,25,250);
    stroke(0);
    this.widthHeight = this.mass*2;
    ellipse(this.pos.x, this.pos.y, this.widthHeight, this.widthHeight);
  }
  
  this.edges = function(){ //detect if ellipse is hitting edge, and if is it, reverse velocity and reduce by 50%
    if(this.pos.y > height){
      this.vel.y *=-.5;
      this.pos.y = height;
    }
        if(this.pos.y < 0){
      this.vel.y *=-.5;
      this.pos.y = 0;
    }
    if(this.pos.x > width){
      this.vel.x *= -.5;
      this.pos.x = width;
    }
        if(this.pos.x < 0){
      this.vel.x *= -.5;
      this.pos.x = 0;
    }
  }
}