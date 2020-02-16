function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  totalPts = random(100, 300);
  steps = totalPts + 1;
  lines = random(5, 20);
  bias_extremity = random(0.5, 2);
}

var counter = 0;


function draw() {

  for (let i = 0; i < lines-1; i++) {
    start_at = (height / (lines + 2)) * (i + 1);
    bias = ((i / lines) - 0.5) * bias_extremity;
    newLine(height / 2, bias,rcol());
  }
  newLine(height / 2, (0.5) * bias_extremity,'#FFFBFC');
  noLoop();
}

var running = true

function keyPressed() {
  if (key === 's') {
    save('dotFace.png');
  }
  if (running) {
    noLoop();
    running = false;
  } else {
    loop();
    running = true;
  }
}


function newLine(starting_point, bias,color) {
  fill(color);
  noStroke();
  let rand = 0;
  beginShape();
  curveVertex(-10, height + 10);
  curveVertex(-10, height + 10);
  curveVertex(-10, starting_point);
  curveVertex(-10, starting_point);
  for (let i = 1; i < steps; i++) {
    curveVertex((width / steps) * i, starting_point + random(-rand, rand) + bias * (width / steps) * i);
    rand += random(-5, 5);
  }
  curveVertex(width + 10, starting_point);
  curveVertex(width + 10, starting_point);
  curveVertex(width + 10, height + 10);
  curveVertex(width + 10, height + 10);
  endShape();
}

function rcol() {
  index = int(random(0, palette.length));
  return color(palette[index]);
}

palette = ['#FF006E', '#FFBE0B', '#010400', '#FFFBFC', '#3D348B']
//palette = ['#131717','#011638', '#253D5B', '#454955', '#747C92','#D36135']
//Eerie black, Maastricht blue, Japanese indigo, Outer space, Slate grey