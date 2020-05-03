function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.getElementById('markdown'));
  pixelDensity(4);
  frameRate(20);
  noStroke();
  strokeWeight(0);
}

var cube_size = 150;
var cube_side_height = cube_size/2.5;

function draw() {
  background(255);
  let hor_cubes = ceil(width/cube_size) + 1;
  let vert_cubes = ceil(height/(cube_size/2 + cube_side_height)) + 1;
  for(let i = 0; i < hor_cubes; i++) {
    for(let j = 0; j < vert_cubes; j++) {
      if(j%2 == 0) {
        draw_cube(i * cube_size, -cube_size/2 + j * (cube_size/2 + cube_side_height), cube_size);
      } else {
        draw_cube(i * cube_size + cube_size/2, -cube_size/2 + j * (cube_size/2 + cube_side_height), cube_size);
      }
    }
  }
  noLoop();

  
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
  '#0A141C', // black
  '#D0C8AD', // vanilla
  '#1D3461', // dark blue
  '#CE2D35', // red
  '#476949' // dark green
];


function random_colour() {
  return color( colours[ int( random(0, colours.length ) ) ] );
}

function draw_cube(x_start, y_start, cube_size) {
  strokeWeight(0.2);
  
  // top square
  let top_color = color('#0A141C');
  fill(top_color);
  stroke(top_color);
  beginShape();
  vertex(x_start,y_start);
  vertex(x_start + cube_size/2, y_start + cube_size/2);
  vertex(x_start, y_start + cube_size);
  vertex(x_start - cube_size/2, y_start + cube_size/2);
  endShape(CLOSE);

  // left side
  let left_color = color('#D0C8AD');
  fill(left_color);
  stroke(left_color);
  beginShape();
  vertex(x_start - cube_size/2, y_start + cube_size/2);
  vertex(x_start, y_start + cube_size);
  vertex(x_start, y_start + cube_size + cube_side_height);
  vertex(x_start - cube_size/2, y_start + cube_size/2 + cube_side_height);
  endShape(CLOSE);

  // right side
  let right_color = color('#CE2D35');
  fill(right_color);
  stroke(right_color);
  beginShape();
  vertex(x_start + cube_size/2, y_start + cube_size/2);
  vertex(x_start, y_start + cube_size);
  vertex(x_start, y_start + cube_size + cube_side_height);
  vertex(x_start + cube_size/2, y_start + cube_size/2 + cube_side_height);
  endShape(CLOSE);

}
