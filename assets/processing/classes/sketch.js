function preload() {
  randomSeed(346);

}

const ring_size = 5;
const number_of_segments = 60;
const num_movers = 500;
const exponent = 1.3;

var running = true;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.getElementById('markdown'));
  pixelDensity(4);
  frameRate(24);
  strokeWeight(1);

  //background('#011627');
  background('#060E70');
  ring_sizes = giveRingSizes(100);
  first_system = new CircleSystem(50, floor(random(24,96)), random(50,width-50), random(50,height-50));
  second_system = new CircleSystem(50, floor(random(24,96)), random(50,width-50), random(50,height-50));
  third_system = new CircleSystem(50, floor(random(24,96)), random(50,width-50), random(50,height-50));
}


function circle1(x, y, s, cc) {
  let r = s*0.5;
  for (let i = 0; i < cc; i++) {
    let angle = random(TAU);
    let radius = sqrt(random(1));
    stroke(0, random(80));
    point(x+cos(angle)*r*radius, y+sin(angle)*r*radius);
  }
}

function circle2(x, y, s, cc) {
  let r = s*0.5;
  for (let i = 0; i < cc; i++) {
    let angle = random(TAU);
    let radius = random(1);
    stroke(0, random(80));
    point(x+cos(angle)*r*radius, y+sin(angle)*r*radius);
  }
}


function circle3(x, y, s, cc) {
  let r = s*0.5;
  for (let i = 0; i < cc; i++) {
    let angle = random(TAU);
    let radius = 1-random(1)*random(1)*random(0.5, 1);
    stroke(0, random(80));
    point(x+cos(angle)*r*radius, y+sin(angle)*r*radius);
  }
}
function circle4(x, y, s, cc) {
  let r = s*0.5;
  for (let i = 0; i < cc; i++) {
    let angle = random(TAU);
    let radius = sqrt(random(1))*random(1);
    stroke(0, random(80));
    point(x+cos(angle)*r*radius, y+sin(angle)*r*radius);
  }
}


function draw() {
  if(frameCount % 3 ==0) {  background('#060E70');}
  
  noStroke();
  first_system.move();
  second_system.move();
  third_system.move();

  // circle1(width*0.25, height*0.25, width*0.4, 400000);
  // circle2(width*0.75, height*0.25, width*0.4, 400000);
  // circle3(width*0.25, height*0.75, width*0.4, 400000);
  // circle4(width*0.75, height*0.75, width*0.4, 400000);
  //noLoop();

  
}

function mousePressed() {
  if (running) {
    noLoop();
    running = false;
  } else if (!running) { 
    loop();
    running = true;
  }
}

function keyTyped() {
  if (key === 'r') {
    setup();
  }
  if (key === 's') {
    save('cubes.jpg');
  }
}

let colours = [
  '#F71735', // Red
  '#6DB5D4', // light blue
  '#F3F468', // yellow
  '#FDFFFC', // white
  '#A3F9A2',
  '#0D067D',
  '#0D067D',
  '#5C27C7',
  '#8338EC',
  '#A867F2',
  '#CD96F7'
 // '#F3C4FD'
];

function giveRingSizes(rings, segments) {
  let ring_sizes = [];
  ring_sizes[0] = 5;
  for(let i = 1; i < rings; i++) {
    ring_sizes[i] = ring_sizes[i-1] + ring_sizes[i-1] * PI * 2 / segments;
  }
  return ring_sizes;
}

function randomColour() {
  return color( colours[ int( random(0, colours.length ) ) ] );
}

class CircleSystem {
  constructor(num_movers, segments, center_x, center_y) {
    this.movers = new Array(num_movers); 
    this.center_x = center_x;
    this.center_y = center_y;
    this.num_segments = segments;
    this.ring_sizes = giveRingSizes(100, this.num_segments);
    for (let i = 0; i < num_movers; i++) {
      this.movers[i] = new Mover(
          this.center_x, 
          this.center_y, 
          randomColour(), 
          floor(random(0,this.num_segments)), 
          1, 
          1, 
          this.num_segments,
          this.ring_sizes
        );
    }
  }
  move() {
    for (let i = 0; i < this.movers.length; i++) {
      this.movers[i].move();
    }
  }

  drawDots() {
    let number_of_rings = 100;
    for (let i = 0; i < number_of_rings; i++) {
      for (let j = 0; j < this.num_segments; j++) {
        let distance_from_center = this.ring_sizes[i]
        fill(255);
        stroke(255);
        point(this.center_x + cos(TWO_PI*j/this.num_segments) * distance_from_center, this.center_y + sin(TWO_PI*j/this.num_segments) * distance_from_center);
      }
    }
  }
}

class Mover {
  constructor(center_x, center_y, color, segment, radius, thickness, num_segments, ring_sizes) {
    this.center_x = center_x;
    this.center_y = center_y;
    this.color = color;
    this.segment = segment;
    this.radius = radius;
    this.thickness = thickness;
    this.num_segments = num_segments;
    this.ring_sizes = ring_sizes;
  }
  move() {
    let decider = random();
    if(decider<0.6) {
      let current_x_pos = this.center_x + this.ring_sizes[this.radius] * cos(this.segment * TWO_PI / this.num_segments);
      let current_y_pos = this.center_y + this.ring_sizes[this.radius] * sin(this.segment * TWO_PI / this.num_segments);
      let new_x_pos = this.center_x + this.ring_sizes[this.radius + 1] * cos(this.segment * TWO_PI / this.num_segments);
      let new_y_pos = this.center_y + this.ring_sizes[this.radius + 1] * sin(this.segment * TWO_PI / this.num_segments);
      stroke(color(this.color));
      strokeWeight(this.thickness);
      line(current_x_pos, current_y_pos, new_x_pos, new_y_pos);
      this.radius += 1;

    } else { // making the arc
      let new_segment = this.segment + (random() < 0.5 ? 1 : -1); // choosing whether to go CW or CCW
      stroke(color(this.color));
      strokeWeight(this.thickness);
      noFill();
      arc(this.center_x, this.center_y, this.ring_sizes[this.radius] * 2, this.ring_sizes[this.radius] * 2,  min(this.segment, new_segment) * TWO_PI / this.num_segments, max(this.segment, new_segment) * TWO_PI / this.num_segments);
      this.segment = new_segment;
    }
  }
}

function mousePressed() {
  if (running) {
    noLoop();
    running = false;
  } else if (!running) {
    loop();
    running = true;
  }
}

function keyTyped() {
  if (key === 'r') {
    setup();
  }
  if (key === 's') {
    save('play.jpg');
  }
}