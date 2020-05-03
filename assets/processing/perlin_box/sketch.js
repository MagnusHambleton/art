function preload() {
  // noiseSeed(111);
}

var running = true;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.getElementById('markdown'));
  pixelDensity(4);
  frameRate(24);
  strokeWeight(1);
  //background('#011627');
  background('#060E70');
}



function draw() {
  //background(0);
  //drawDots();
  visualizePerlinNoise();
  let num_points_per_side = 30;
  let box_side = min(width, height) / 2;
  let point_distance = box_side / (num_points_per_side - 1);
  let points = [[]];
  for(let i=0; i < num_points_per_side; i++) {
    points[i * 4]     = [width / 2 - box_side / 2 + i * point_distance, height / 2 - box_side / 2];
    points[i * 4 + 1] = [width / 2 - box_side / 2 + i * point_distance, height / 2 + box_side / 2];
    points[i * 4 + 2] = [width / 2 - box_side / 2, height / 2 - box_side / 2 + i * point_distance];
    points[i * 4 + 3] = [width / 2 + box_side / 2, height / 2 - box_side / 2 + i * point_distance];
  }
  generate(points);
  noLoop();
}

const factor = 0.002;
const sensitivity = 3;

function visualizePerlinNoise() {
  noStroke();
  for(let i = 0; i < width/8; i++) {
    for(let j = 0; j < height/8; j++) {
      let x = i * 8;
      let y = j * 8;
      let n = noise(x * factor, y * factor);
      fill(makeColour(n));
      rect(x, y,4,4);

    }
  }
}

function generate(starting_points) {
  //background('#060E70');
  // noise detail, in octaves (higher numbers = more swirly lines)
  noiseDetail(2);
  const pointsPerLine = 10000; // originally 10000
  for (let i = 0; i < starting_points.length; i++) {
    // Starting point for the line (in the center 20-80% of the image)
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
  let from_colour = color('#060E70');
  let to_colour = color('#FDF6FE');
  return lerpColor(from_colour, to_colour, amount);
}

function sigmoid(x, k) {
  return 1 / (Math.exp(-k * (x - 0.5)) + 1);
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
    draw();
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