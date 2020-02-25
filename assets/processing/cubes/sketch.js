function preload() {
  image1 = loadImage('/assets/images/cubes/image1.jpg');
  image2 = loadImage('/assets/images/cubes/image2.jpg');
  image3 = loadImage('/assets/images/cubes/image3.jpg');

}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.getElementById('markdown'));
  pixelDensity(4);
  frameRate(20);
  noStroke();
  strokeWeight(0);

}

var cube_size = 200;
var cube_side_height = cube_size/2.5;
var running = true;

function draw() {
  background(255);
  fill_crosses();
  // draw_cross(200,200,200, image1, image2, image3);
  // draw_cross(600,400,200, image1, image2, image3);
  // draw_cross(800,400,200, image1, image2, image3);
  // draw_cross(1000,400,200, image1, image2, image3);
  //image(image1, 100,100);
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
    save('cubes.jpg');
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

function copy_image(image_to_copy, x_loc, y_loc, w, h) {
  var return_image = createImage(w, h);
  return_image.copy(image_to_copy,x_loc,y_loc,w, h, 0, 0, w, h);
  return return_image;
}

function draw_cross(x_start, y_start, cube_size, im1, im2, im3) {
  strokeWeight(0.2);
  
  // top part
  let top_color = color('#0A141C');
  var image_1 = copy_image(im1,x_start-cube_size, y_start, 2*cube_size, 2*cube_size);

  var top_side = createGraphics(2*cube_size, 2*cube_size);
  top_side.fill('rgba(0,0,0,1)');
  //stroke(top_color);
  top_side.beginShape();
  top_side.vertex(cube_size,               0 + cube_size/2 * tan(PI/6));
  top_side.vertex(cube_size + cube_size/4, 0 + cube_size/4 * tan(PI/6));
  top_side.vertex(cube_size + cube_size/2, 0 + cube_size/2 * tan(PI/6));
  top_side.vertex(cube_size,               0 + cube_size   * tan(PI/6));
  top_side.vertex(cube_size - cube_size/2, 0 + cube_size/2 * tan(PI/6) );
  top_side.vertex(cube_size - cube_size/4, 0 + cube_size/4 * tan(PI/6));
  top_side.endShape(CLOSE);
  image_1.mask(top_side);
  image(image_1,x_start-cube_size,y_start,2*cube_size,2*cube_size);

  // left side
  let left_color = color('#D0C8AD');
  var image_2 = copy_image(im2,x_start-cube_size, y_start, 2*cube_size, 2*cube_size);
  var left_side = createGraphics(2*cube_size, 2*cube_size);
  left_side.fill('rgba(0,0,0,1)');
  //fill(left_color);
  //stroke(left_color);
  left_side.beginShape();
  left_side.vertex(cube_size- cube_size/2,  0 + cube_size/2   * tan(PI/6));
  left_side.vertex(cube_size - cube_size/2, 0 + cube_size     * tan(PI/6));
  left_side.vertex(cube_size - cube_size/4, 0 + cube_size*5/4 * tan(PI/6));
  left_side.vertex(cube_size - cube_size/4, 0 + cube_size*7/4 * tan(PI/6));
  left_side.vertex(cube_size,               0 + cube_size*2   * tan(PI/6));
  left_side.vertex(cube_size,               0 + cube_size     * tan(PI/6));
  left_side.endShape(CLOSE);
  image_2.mask(left_side);
  image(image_2,x_start-cube_size,y_start,2*cube_size,2*cube_size);

  // right side
  let right_color = color('#CE2D35');

  var image_3 = copy_image(im3,x_start-cube_size, y_start, 2*cube_size, 2*cube_size);
  var right_side = createGraphics(2*cube_size, 2*cube_size);
  right_side.fill('rgba(0,0,0,1)');
  //stroke(right_color);
  right_side.beginShape();
  right_side.vertex(cube_size + cube_size/2, 0 + cube_size/2   * tan(PI/6));
  right_side.vertex(cube_size + cube_size/2, 0 + cube_size     * tan(PI/6));
  right_side.vertex(cube_size + cube_size/4, 0 + cube_size*5/4 * tan(PI/6));
  right_side.vertex(cube_size + cube_size/4, 0 + cube_size*7/4 * tan(PI/6));
  right_side.vertex(cube_size,               0 + cube_size*2   * tan(PI/6));
  right_side.vertex(cube_size,               0 + cube_size     * tan(PI/6));
  right_side.endShape(CLOSE);
  image_3.mask(right_side);
  image(image_3,x_start-cube_size,y_start,2*cube_size,2*cube_size);


}

function fill_crosses() {
  let hor_crosses = ceil(width/(cube_size*1.5)) + 1;

  let vert_crosses = ceil(height/(cube_size)*3) + 1;
  console.log(hor_crosses,vert_crosses);

  for(let i = 0; i < hor_crosses; i++) {
    for(let j = 0; j < vert_crosses; j++) {
      if(j%2 == 0) {
        draw_cross(i * cube_size * 3/2,               j * cube_size * tan(PI/6) * 3/4 - cube_size, cube_size, image1, image2, image3);
      } else {
        draw_cross(i * cube_size * 3/2 + cube_size*3/4, j * cube_size * tan(PI/6) * 3/4 - cube_size, cube_size, image1, image2, image3);
      }
    }
  }
}

function draw_cube(x_start, y_start, cube_size) {
  strokeWeight(0.2);
  
  // top square
  let top_color = color('#0A141C');
  fill(top_color);
  stroke(top_color);
  beginShape();
  vertex(x_start,y_start);
  vertex(x_start + cube_size/2, y_start + cube_size/2 * tan(PI/6) );
  vertex(x_start, y_start + cube_size * tan(PI/6));
  vertex(x_start - cube_size/2, y_start + cube_size/2 * tan(PI/6) );
  endShape(CLOSE);

  // left side
  let left_color = color('#D0C8AD');
  fill(left_color);
  stroke(left_color);
  beginShape();
  vertex(x_start - cube_size/2, y_start + cube_size/2 * tan(PI/6));
  vertex(x_start, y_start + cube_size * tan(PI/6));
  vertex(x_start, y_start + 2 * cube_size * tan(PI/6));
  vertex(x_start - cube_size/2, y_start + 3/2*cube_size * tan(PI/6) );
  endShape(CLOSE);

  // right side
  let right_color = color('#CE2D35');
  fill(right_color);
  stroke(right_color);
  beginShape();
  vertex(x_start + cube_size/2, y_start + cube_size/2 * tan(PI/6) );
  vertex(x_start, y_start + cube_size * tan(PI/6));
  vertex(x_start, y_start + 2 * cube_size * tan(PI/6));
  vertex(x_start + cube_size/2, y_start + 3/2*cube_size * tan(PI/6) );
  endShape(CLOSE);

}

function fill_cubes() {
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
}