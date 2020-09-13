function preload() {
  //noiseSeed(1212);
  //randomSeed(2222);
}

var running = true;
const num_blobs = 2;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.getElementById('markdown'));
  pixelDensity(2);
  frameRate(30);
  strokeWeight(1);
  //noiseSeed(random(1000000));
  blobs = [];
  for(let i=0; i<num_blobs; i++) {
    blobs.push(new Blob(width/2, height/2, min(width,height)/6, int(random()*3+3), color(255,255,0,170)));
    blobs.push(new Blob(width/2, height/2, min(width,height)/6, int(random()*3+3), color(0,255,255,170)));
    blobs.push(new Blob(width/2, height/2, min(width,height)/6, int(random()*3+3), color(255,0,255,170)));
  }

}

function draw() {
  //background('#011627');
  blendMode(LIGHTEST);
  background('#FFFFFF');
  blendMode(DARKEST);
  //visualizeNoise(frameCount);
  //noLoop();
  noStroke();
  beginShape();
  for(let i=0; i<blobs.length; i++) {
    blobs[i].draw(frameCount);
    //blobs[i].move(frameCount);
  }
  //noLoop();
}

const noise_scale = 0.003;
const t_scale = 0.02;
const noise_shift = 1000;
const speed = 10;

class Blob {
  constructor(x, y, size, points, color) {
    this.pos = [x,y];
    this.size = size;
    this.num_points = points;
    this.color = color;
    this.random_shift = random()*2000;
  }

  draw(t) {
    let arc = TWO_PI / this.num_points;
    let cp_arc = arc/3;
    let cp_dev_scale = 100;
    let p_dev_scale = 100;
    let p_noise_shift = this.random_shift;
    let points = [];
    let cp_2 = [];
    let cp_1 = [];
    for(let i = 0; i < this.num_points; i++) {
      let p_noise = noise(noise_scale*this.size*cos(i*arc) + p_noise_shift, noise_scale*this.size*sin(i*arc) + p_noise_shift, t_scale*t) - 0.5;
      let p_dev = p_dev_scale * p_noise
      points[i] = [this.pos[0] + (this.size+p_dev)* cos((i+1)*arc), this.pos[1] + (this.size+p_dev) * sin((i+1)*arc)];
      let cp_noise = noise(noise_scale*this.size*cos(i*arc) + noise_shift, noise_scale*this.size*sin(i*arc) + noise_shift, t_scale*t) - 0.5;
      let cp_dev = cp_dev_scale * cp_noise;
      cp_2[i] = [this.pos[0] + (this.size+cp_dev) * cos((i+1)*arc - cp_arc), this.pos[1] + (this.size+cp_dev) * sin((i+1)*arc - cp_arc)];
    }
    fill(this.color);
    beginShape();
    // first point takes into account closing
    vertex(points[this.num_points-1][0], points[this.num_points-1][1]);

    for(let i = 0; i < this.num_points; i++) {
      let pi = i - 1;
      if(i==0) {
        pi = this.num_points-1;
      }
      let cp_angle = i * arc + cp_arc;
      let d_top = sin(cp_angle) * (this.pos[0] - cp_2[pi][0]) + cos(cp_angle) * (cp_2[pi][1] - this.pos[1]);
      let d_bottom = sin(cp_angle) * (points[pi][0] - cp_2[pi][0]) + cos(cp_angle) * (points[pi][1] - cp_2[pi][1]);
      let d = 1//d_top/d_bottom;
      cp_1[i] = [d * (points[pi][0]-cp_2[pi][0]) + points[pi][0], d * (points[pi][1]-cp_2[pi][1]) + points[pi][1]];

      bezierVertex(cp_1[i][0], cp_1[i][1], cp_2[i][0], cp_2[i][1], points[i][0], points[i][1]);
    }
    endShape();
  }

  move(t) {
    this.pos[0] = this.pos[0] + speed*(noise(noise_scale*this.pos[0]+this.random_shift, noise_scale*this.pos[0], t_scale*t)-0.5);
    this.pos[1] = this.pos[1] + speed*(noise(noise_scale*this.pos[1]+this.random_shift, noise_scale*this.pos[1], t_scale*t)-0.5)
  }

}

function makeCurveShape(t) {

  let num_points = 8;
  let arc = TWO_PI / num_points;
  let circle_size = 200;
  let mid_x = width/2;
  let mid_y = height/2; 
  let deviation_scale = 400;

  noFill();
  stroke('#FFFFFF');
  beginShape();
  for(let i = -1; i < num_points+2; i++) {
    let noise_amount = noise(noise_scale*circle_size*cos(i*arc) + noise_shift, noise_scale*circle_size*sin(i*arc) + noise_shift, t_scale*t) - 0.5;
    let dev = deviation_scale * noise_amount;
    curveVertex(mid_x + (circle_size+dev) * cos(i*arc), mid_y + (circle_size+dev) * sin(i*arc));
    //ellipse(mid_x + (circle_size+dev) * cos(i*arc), mid_y + (circle_size+dev) * sin(i*arc),5,5)
  }
  endShape();
}

function visualizeNoise(t) {
  let square_size = 20;
  let hor_squares = Math.floor(width/square_size) + 1;
  let ver_squares = Math.floor(height/square_size) + 1;
  for(let i = 0; i < hor_squares; i++) {
    for(let j = 0; j < ver_squares; j++) {
      let noise_color = noise(noise_scale * i * square_size + noise_shift, noise_scale * j * square_size + noise_shift, t_scale*t);
      fill(255*noise_color);
      noStroke();
      rect(square_size*i, square_size*j, square_size, square_size);
    }
  }
}


function randomColour() {
  return color(colours[floor(random(0,colours.length))]);
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