function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.getElementById('markdown'));
  pixelDensity(4);
  frameRate(20);
  noStroke();
  strokeWeight(0);
  dots = new Array(0); 
  sprites = new Array(colours.length);
  for (let i = 0; i < colours.length; i++) {
    sprites[i] = createGraphics(sprite_size+20, sprite_size+20);
    sprites[i].noStroke();
    sprites[i].background('rgba(0,0,0, 0)');
    sprites[i].fill(colours[i]);
    sprites[i].ellipse(sprite_size/2+10, sprite_size/2+10, sprite_size/1.5, sprite_size/1.5,);
    sprites[i].filter(BLUR, 25);
    sprites[i].filter(DILATE);
    sprites[i].ellipse(sprite_size/2+10, sprite_size/2+10, sprite_size/3, sprite_size/3,);
    sprites[i].filter(BLUR, 15);
    sprites[i].fill(255);
    sprites[i].ellipse(sprite_size/2+10, sprite_size/2+10, sprite_size/6, sprite_size/6,);
    sprites[i].filter(BLUR, 3);
    sprites[i].loadPixels();
    sprites[i].updatePixels();
  }
  // randomly set blend mode
  let blending_modes = [BLEND, LIGHTEST, DIFFERENCE];
  let random_blending_mode = blending_modes[int(random(0,blending_modes.length))];
  //blendMode(random_blending_mode); 
  blendMode(random_blending_mode);
}

var dot_speed = [2,11];
var dot_size = [3,11];
var num_dots = 2;
var border_error = 30;
var running = true;
var sprite_size = 50;
var speed_factor = 1;

function draw() {
  background(0);
  for (let i = 0; i < num_dots; i++) {
    dots.push(new dot(random(0,width), height+10));
  }
  //draw and move existing dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].draw_dot();
    dots[i].move_dot();
  }
  //remove out of bounds dots
  for (let i = 0; i < dots.length; i++) {
    if ( dots[i].out_of_bounds()) {
      dots.splice(i,1);
      i--;
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
    save('aesthetic.jpg');
  }
}

let colours = [
  '#FFD026', // yellow 
  '#FF206E', // pink
  '#1BE7FF', // cyan
  '#35FF3C', // neon green
  '#004FFF' // blue
];


function random_neon_colour() {
  return color( colours[ int( random(0, colours.length ) ) ] );
}

class dot {
  constructor(x_pos, y_pos) {
    this.pos = [x_pos,y_pos];
    let speed = random(-dot_speed[0],-dot_speed[1]);
    this.direction = [random(-1,1) * speed/10, speed];
    this.colour = int( random(0, colours.length ) );
    this.size = speed**2;
    }
  
  draw_dot() {
    image(sprites[this.colour], this.pos[0]-this.size/2, this.pos[1]-this.size/2, this.size, this.size);
  }
  move_dot() {
    this.pos[0] += this.direction[0]*speed_factor;
    this.pos[1] += this.direction[1]*speed_factor;
  }
  out_of_bounds() {
    let is_out_of_bounds = false;
    if(this.pos[0] < 0 || this.pos[0] > width || this.pos[1] < 0) is_out_of_bounds = true; // left screen edge
    return is_out_of_bounds;
  }
}
