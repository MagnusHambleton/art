function preload() {
  img = loadImage('/assets/images/fuck.jpg');
}
function setup() {
  console.log(img.height, img.width);
  var cnv = createCanvas(img.width, img.height);
  cnv.parent(document.getElementById('markdown'));
  console.log(windowWidth, windowHeight)
  pixelDensity(4);
  blendMode(EXCLUSION);
  background(255);
  //image(img, 0, 0, width, height);
  noStroke();
  //noisee(5,0,0,width,height);
}

var counter = 0;
var brushSize = 10;

// num dots to choose each time
var num_circles = 10;

function draw() {
  for(let j = 0; j < num_circles; j++) {

    // pick random point on canvas
    var x = int(random(0,img.width));
    var y = int(random(0,img.height));
    var pix = img.get(x,y);
    var rgb = [ red(pix), green(pix), blue(pix)];
    var cmy = [1-rgb[0]/255, 1-rgb[1]/255, 1-rgb[2]/255];

    var rand = int(random(0,3));
    var weight = 0;
    for(var i = 0; i < 3; i++) {
      if(rand != i) { 
        cmy[i]=0;
        rgb[i]=0;
      }
      else { 
        weight = 1//rgb[i]/255;
        opacity = 1-rgb[i]/255;
        cmy[i] = 1;
        rgb[i] = 255;
      }
    }
    var r = (1-cmy[0])*255;
    var g = (1-cmy[1])*255;
    var b = (1-cmy[2])*255;
    //print(r,g,b);
    //println();
    //noLoop();
    //console.log(rgb[0], rgb[1], rgb[2], 255*opacity);
    fill(rgb[0], rgb[1], rgb[2], 255*opacity);
    //if(counter==200){noLoop();}
    ellipse(x, y, brushSize*weight, brushSize*weight);
  
    if (counter%1000 == 0 && counter !=0) {
      brushSize = brushSize;
    }
    counter = counter + 1;
    //if (counter%21000==0 && counter !=0) {
     // noisee(5,0,0,width,height);
     // noLoop();
    //}
  }
  //noLoop();
}

var running = true;

function keyPressed() {
  if(key == 's') saveImage();
  
  if(running) {
    noLoop();
    running = false;
  } else {
    loop();
    running = true;
  }
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
