function preload() {
  noiseSeed(1212);
  randomSeed(2222);
}

var running = true;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.getElementById('markdown'));
  pixelDensity(1);
  frameRate(60);
  strokeWeight(1);
  //background('#011627');
  background('#011627');
  //noiseSeed(random(1000000));
  var num_orbiters = 0;
  orbiters =[];
  for(let i=0; i<num_orbiters; i++) {
    orbiters[i] = new Orbiter([random(200,1200),random(150,950)], [random(0,1),random(0,1)], randomColour());
  }

  var num_ringsystems = 3;
  ring_sizes = giveRingSizes(100);
  ring_systems = [];
  for(let i=0; i<num_ringsystems; i++) {
    ring_systems[i] = new CircleSystem(50, floor(random(24,96)), random(50,width-50), random(50,height-50));
  }
  perlinContours();
}

const factor = 0.002;
const sensitivity = 2;
const slope_factor = 5;


function draw() {
  //background('#002C44');
  //mountainLine();
  for(let i=0; i<ring_systems.length; i++) {
    // ring_systems[i].drawDots(2);
    //ring_systems[i].moveSteps(50);
  }
  let side = min(width, height) / 2;
  let points = makeTrianglePoints(30, side);
  makeNiceBackground();
  perlinContours();
  beginShape();
  vertex(200,200);
  vertex(230,256);
  vertex(300,270);
  vertex(320,240);
  endShape();
  //generate(points);
  noLoop();


}

function perlinContours() {
  let levels = 30;
  let diff_allowance = 1/(10*levels);
  let pos_array = [[]];
  let i = 0;
  let y = 500;
  let n_level = floor(noise(0 * factor, y * factor, 0)*levels);
  for(let x = 0; x < width; x ++) {
    stroke(255);
    point(x,y);
    n = floor(noise(x * factor, y * factor, 0)*levels);
    if(n > n_level  || n < n_level) {
      stroke(255,0,0);
      point(x,y);
      n_level = n;
    }
  }
}

function makeNiceBackground() {
  let d = pixelDensity();
  let levels = 30;
  let temp_factor = factor/d;
  loadPixels();
  for(let x = 0; x < width*d; x ++) {
    for(let y = 0; y < height*d; y++) {
      let index = (x + y * width * d) * 4;
      let col = steppedColour(floor(noise(x * temp_factor, y * temp_factor, 0)*levels)/levels);
      pixels[index + 0] = red(col);
      pixels[index + 1] = green(col);
      pixels[index + 2] = blue(col);
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
  visualizePerlinNoise();
}

function makeCirclePoints(num_points,fundamental_scale) {
  fundamental_scale = fundamental_scale/2;
  num_points = num_points*3;
  let points = [[]];
  for(let i=0; i < num_points; i++) {
    let angle = i*TWO_PI/(num_points);
    points[i] = [fundamental_scale*cos(angle)+width/2, fundamental_scale*sin(angle)+height/2];
  }
  return points;
}

function makeSquarePoints(num_points_per_side,fundamental_scale) {
  let box_side = fundamental_scale;
  let point_distance = box_side / (num_points_per_side - 1);
  let points = [[]];
  for(let i=0; i < num_points_per_side; i++) {
    points[i * 4]     = [width / 2 - box_side / 2 + i * point_distance, height / 2 - box_side / 2];
    points[i * 4 + 1] = [width / 2 - box_side / 2 + i * point_distance, height / 2 + box_side / 2];
    points[i * 4 + 2] = [width / 2 - box_side / 2, height / 2 - box_side / 2 + i * point_distance];
    points[i * 4 + 3] = [width / 2 + box_side / 2, height / 2 - box_side / 2 + i * point_distance];
  }
  return points;
}

function makeTrianglePoints(num_points, fundamental_scale) {
  let bottom_to_center = fundamental_scale * Math.sqrt(3) / 6; // twice this from center to top
  let top_point = [width/2, height/2 - 2 * bottom_to_center];
  let right_point = [(width + fundamental_scale) / 2, height/2 + bottom_to_center];
  let left_point = [(width - fundamental_scale) / 2, height/2 + bottom_to_center];
  let step_size = fundamental_scale/num_points;
  let points = [[]];
  for(let i=0; i < num_points; i++) {
    let d = i * step_size; 
    points[i * 3 + 0] = [right_point[0] - d, right_point[1]];
    points[i * 3 + 1] = [left_point[0] + d * cos(-PI/3), left_point[1] + d * sin(-PI/3)];
    points[i * 3 + 2] = [top_point[0] + d * cos(PI/3), top_point[1] + d * sin(PI/3)];
  }
  return points;
}

function makeSPoints(num_points, fundamental_scale) {
  fundamental_scale = fundamental_scale/1.5;
  num_points = num_points/1.5;
  let triangle_height = fundamental_scale * Math.sqrt(3) / 2; // twice this from center to top
  let top_point = [width/2, height/2 - triangle_height];
  let right_point = [(width + fundamental_scale) / 2, height/2];
  let left_point = [(width - fundamental_scale) / 2, height/2];
  let step_size = fundamental_scale/num_points;
  let points = [[]];
  for(let i=0; i < num_points; i++) {
    let d = i * step_size; 
    points[i * 3 + 0] = [right_point[0] - d, right_point[1]];
    points[i * 3 + 1] = [left_point[0] + d * cos(-PI/3), left_point[1] - d * sin(-PI/3)];
    points[i * 3 + 2] = [top_point[0] + d * cos(PI/3), top_point[1] + d * sin(PI/3)];
  }
  return points;
}

function makeDiamondPoints(num_points, fundamental_scale) {
  fundamental_scale = fundamental_scale/1.5;
  num_points = num_points/1.5;
  let triangle_height = fundamental_scale * Math.sqrt(3) / 2; // twice this from center to top
  let top_point = [width/2, height/2 - triangle_height];
  let right_point = [(width + fundamental_scale) / 2, height/2];
  let left_point = [(width - fundamental_scale) / 2, height/2];
  let step_size = fundamental_scale/num_points;
  let points = [[]];
  for(let i=0; i < num_points; i++) {
    let d = i * step_size; 
    points[i * 5 + 0] = [right_point[0] - d, right_point[1]];
    points[i * 5 + 1] = [left_point[0] + d * cos(-PI/3), left_point[1] - d * sin(-PI/3)];
    points[i * 5 + 2] = [top_point[0] + d * cos(PI/3), top_point[1] + d * sin(PI/3)];
    points[i * 5 + 3] = [left_point[0] + d * cos(-PI/3), left_point[1] + d * sin(-PI/3)];
    points[i * 5 + 4] = [right_point[0] + d * cos(2*PI/3), right_point[1] + d * sin(2*PI/3)];
  }
  return points;
}

function getSlope(loc) {
  let [x, y] = loc;
  let slope_x = noise((x - 0.5) * factor, y * factor, 0) - noise((x + 0.5) * factor, y * factor, 0);
  let slope_y = noise(x * factor, (y - 0.5) * factor, 0) - noise(x * factor, (y + 0.5) * factor, 0);
  return [slope_factor*slope_x, slope_factor*slope_y];
}

class Orbiter {
  constructor(location, vel, color) {
    this.location = location;
    this.vel = vel;
    this.color = color;
  }
  move(force_vector) {
    this.vel[0] += force_vector[0];
    this.vel[1] += force_vector[1];

    this.location[0] += this.vel[0];
    this.location[1] += this.vel[1];
    
  }
  show() {
    fill(this.color);
    noStroke();
    ellipse(this.location[0], this.location[1], 4,4);
  }
}

class Mass {
  constructor(location, mass) {
    this.location = location;
    this.mass = mass;
  }
  show() {
    fill(255);
    ellipse(this.location[0], this.location[1], Math.sqrt(this.mass), Math.sqrt(this.mass));
  }
  getForce(at_location) {
    let distance = Math.sqrt(Math.pow(at_location[0] - this.location[0],2)+Math.pow(at_location[1] - this.location[1],2));
    let force = 1 / Math.pow(distance/100,2);
    let angle = Math.atan2((this.location[1]-at_location[1]), (this.location[0]-at_location[0]));
    let force_vector = [cos(angle)*force, sin(angle)*force];
    return force_vector;
  }
}

function steppedColour(amount) {
  let from_colour = color('#440158');
  let mid_colour = color('#29af7f');
  let to_colour = color('#fde725');
  if(amount >=0.5) {

    return_color = lerpColor(from_colour, mid_colour, 2*(amount - 0.5))
  } else {
    return_color = lerpColor(mid_colour, to_colour, 2*(amount))
  }
  return return_color;
}

function randomColour() {
  return color(colours[floor(random(0,colours.length))]);
}

function mountainLine() {
  let volatility = 0.05;
  let x = 0;
  let y = height/2;
  let angle = 0;
  let value = noise(x * factor, y * factor);
  const pointsPerLine = width*4;
  noFill();
  stroke(255);
  beginShape();
  let discontinuity = 0;
  let amplitude = [random(150,300), random(150,300)];
  let period = [random(150,500),random(150,500)];
  let offset = random(0,PI);
  while(x<width) {
    angle = noise(x * volatility, discontinuity) * PI - HALF_PI;
    if(random(0,1)<0.03) {
      discontinuity+=1;
    }
    x += cos(angle);
    y += sin(angle);
    let display_y = y + sin(x/period[0]+offset)*amplitude[0]+ sin(x/period[1])*amplitude[1];
    vertex(x, display_y);
  }
  endShape();
}


function visualizePerlinNoise() {
  noStroke();
  let square_size = 2;
  for(let i = 0; i < width/(2*square_size); i++) {
    for(let j = 0; j < height/(2*square_size); j++) {
      let x = i * (2*square_size);
      let y = j * (2*square_size);
      let n = noise(x * factor, y * factor);
      fill(steppedColour(n));
      rect(x, y,square_size,square_size);
    }
  }
}

function explorers(starting_points) {
  noiseDetail(2);
  const pointsPerLine = 1000;
  const step_angle = 0.05;
  const step_size = 4;
  for (let i = 0; i < starting_points.length; i++) {
    noFill();
    stroke(0);
    beginShape();
    let x = starting_points[i][0];
    let y = starting_points[i][1];
    vertex(x,y);
    let starting_val = noise(x * factor, y * factor);
    let heading = starting_val;
    for (let j = 0; j < pointsPerLine; j++) {
      let min_delta = 1;
      let best_angle;
      for (let k = heading - HALF_PI; k < heading + HALF_PI; k = k + step_angle) {
        let temp_x = x + step_size * cos(k);
        let temp_y = y + step_size * sin(k);
        let diff = abs(noise(temp_x * factor, temp_y * factor) - starting_val);
        if(diff < min_delta ) {
          min_delta = diff;
          best_angle = k;
        }
      }
      x = x + step_size * cos(best_angle);
      y = y + step_size * sin(best_angle);
      heading = best_angle;
      vertex(x,y);
    }
    endShape();
  }
}

function generate(starting_points) {
  //background('#060E70');
  // noise detail, in octaves (higher numbers = more swirly lines)
  //noiseDetail(2);
  const pointsPerLine = 10000; // originally 10000
  for (let i = 0; i < starting_points.length; i++) {

    let x = starting_points[i][0];
    let y = starting_points[i][1];

    noFill();
    stroke(255);
    beginShape();
    for (let j = 0; j < pointsPerLine; j++) {
      let angle = noise(x * factor, y * factor) * TWO_PI * sensitivity;
      //console.log(angle, x, y);
      vertex(x, y);
      x += cos(angle);
      y += sin(angle);
    }
    endShape();
  }
}

function makeColour(amount) {
  let from_colour = color('#043933');
  let to_colour = color('#f8f7f7');
  return lerpColor(from_colour, to_colour, amount);
}

function sigmoid(x, k) {
  return 1 / (Math.exp(-k * (x - 0.5)) + 1);
}

function giveRingSizes(rings, segments) {
  let ring_sizes = [];
  ring_sizes[0] = 5;
  for(let i = 1; i < rings; i++) {
    ring_sizes[i] = ring_sizes[i-1] + ring_sizes[i-1] * PI * 2 / segments;
  }
  return ring_sizes;
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
          3, 
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
  moveSteps(steps) {
    let i=0;
    while(i<steps) {
      this.move();
      i++;
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

///////////////////
// manolo gamboa //
///////////////////

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
///////////////////
// key and mouse //
///////////////////

function mousePressed() {
  if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height && running) {
    noLoop();
    running = false;
    console.log('stopped');
  } else if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height && !running) {
    loop();
    running = true;
    console.log('started');
  }
}

function keyTyped() {
  if (key === 'r') {
    setup();
    draw();
  }
  if (key === 's') {
    var date_name = year() + '-'+ month() +'-'+day() + "_" + hour() + minute();
    var name = date_name + 'perlin_lines.jpg';
    save(str(name));
  }
}

let colours = [
  '#A54657', // Red
  '#574D68', // light blue
  '#1B998B', // yellow
  '#F2EFEA' // white
  // '#A3F9A2',
  // '#0D067D',
  // '#0D067D',
  // '#5C27C7',
  // '#8338EC',
  // '#A867F2',
  // '#CD96F7'
 // '#F3C4FD'
];