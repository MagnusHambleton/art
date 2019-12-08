
function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent(document.getElementById('markdown'));
  pixelDensity(4);
  blendMode(DARKEST);
  background(255);
  //image(img, 0, 0, width, height);
  noStroke();
  //noisee(5,0,0,width,height);
  color_counter = 0;
  colors = new Array; 
  opacity = 255;
  let cyan = color(0,200,200,opacity);
  let magenta = color(200,0,200,opacity);
  let yellow = color(255,255,0,opacity);
  colors = [cyan, magenta, yellow];
}


// num dots to choose each time
var num_circles = 5;

function draw() {


}

var running = true;

function keyPressed() {
  color_counter = color_counter>=2 ? 0 : color_counter + 1;
  if(key == 's') saveImage();
}

function mousePressed() {
  fill(colors[color_counter]);
  ellipse(mouseX, mouseY, 150,150);
}

function saveImage() {
  var name = "face"+nf(day(), 2)+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2);
  saveFrame(name+".png");
}

function noisee(n, x, y, w, h) {
  var x1 = constrain(x, 0, width);
  var x2 = constrain(x+w, 0, width);
  var y1 = constrain(y, 0, height);
  var y2 = constrain(y+h, 0, height);
  for (var j = y1; j < y2; j++) {  
    for (var i = x1; i < x2; i++) {
      var col = get(i, j);
      var b = random(-n, n);
      col = color(red(col)+b, green(col)+b, blue(col)+b);
      set(i, j, col);
    }
  }
}
