function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.getElementById('markdown'));
  pixelDensity(4);
  frameRate(50);
  noStroke();
  strokeWeight(0);
  dots = new Array(num_dots); 
  for (let i = 0; i < num_dots; i++) {
    dots[i] = new dot(random(0,width), random(0,height));
  }
  lines = [width/3, height/3];
}

var dot_speed = 3;
var dot_size = 5;
var num_dots = 2000;
var border_error = 30;
var running = true;
var line_direction = [1,1];

function draw() {
  background(255);
  for (let i = 0; i < num_dots; i++) {
    dots[i].draw_dot();
    dots[i].move_dot();
  }
  move_lines();
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


class dot {
  constructor(x_pos, y_pos) {
    this.pos = [x_pos,y_pos];
    let random_direction = random(0,TWO_PI);
    this.direction = [dot_speed*cos(random_direction),dot_speed*sin(random_direction)];
    }
  
  draw_dot() {
    fill(0);
    ellipse(this.pos[0],this.pos[1],dot_size,dot_size);
  }
  move_dot() {
    this.pos[0] += this.direction[0];
    this.pos[1] += this.direction[1];
    this.direction = reflected_check(this.pos, this.direction);
  }
}

function reflected_check(position, direction) {
  return_direction = direction;

  if(position[0] < border_error && direction[0] < 0) return_direction[0] = -return_direction[0]; // left screen edge
  if(width - position[0] < border_error && direction[0] > 0) return_direction[0] = -return_direction[0]; // right screen edge
  if(position[1] < border_error && direction[1] < 0) return_direction[1] = -return_direction[1]; // top screen edge
  if(height - position[1] < border_error && direction[1] > 0) return_direction[1] = -return_direction[1]; // bottom screen edge

  if( abs(lines[0] - position[0]) < border_error && ( 
      ( lines[0] - position[0] < 0 && return_direction[0] < 0) || (lines[0] - position[0] > 0 && return_direction[0] > 0)
      )) {
    return_direction[0] = -return_direction[0]; // vertical line
  }
  if(abs(lines[1] - position[1]) < border_error && ( 
    ( lines[1] - position[1] < 0 && return_direction[1] < 0) || (lines[1] - position[1] > 0 && return_direction[1] > 0)
    )) {
    return_direction[1] = -return_direction[1]; // bottom screen edge
  }
  
  return return_direction;

}

function move_lines() {
  lines[0] += line_direction[0];
  lines[1] += line_direction[1];
  if ( lines[0] < 100 && line_direction[0] < 0 ) line_direction[0] = -line_direction[0];
  if ( lines[0] > width-100 && line_direction[0] > 0 ) line_direction[0] = -line_direction[0];

  if ( lines[1] < 100 && line_direction[1] < 0 ) line_direction[1] = -line_direction[1];
  if ( lines[1] > height-100 && line_direction[1] > 0 ) line_direction[1] = -line_direction[1];
}