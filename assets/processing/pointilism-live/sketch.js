function preload() {
  img = loadImage('/assets/images/hike.jpg');
}
function setup() {
  console.log(img.height, img.width);
  var cnv = createCanvas(img.width, img.height);
  cnv.parent(document.getElementById('markdown'));
  console.log(windowWidth, windowHeight)
  pixelDensity(4);
  blendMode(MULTIPLY);
  background(255);
  //image(img, 0, 0, width, height);
  noStroke();
  //noisee(5,0,0,width,height);
}

var counter = 0;
var brushSize = 50;

// num dots to choose each time
var num_circles = 5;

function draw() {
  // var x = [];
  // var y = [];
  for(let j = 0; j < num_circles; j++) {
    // x[j] = int(random(img.width/2-20,img.width/2+20));
    // y[j] = int(random(img.height/2-20,img.height/2+20));

    //pick random point on canvas
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
        weight = 1;//cmy[i];//1-rgb[i]/255;
        //opacity = 1-rgb[i]/255;
        opacity = cmy[i];
        cmy[i] = 1;
        rgb[i] = 255;
      }
    }
    var r = (1-cmy[0])*255;
    var g = (1-cmy[1])*255;
    var b = (1-cmy[2])*255;

    fill(r,g,b, 200*opacity);
    //fill(rgb[0], rgb[1], rgb[2], 255*opacity);
    //if(counter==200){noLoop();}
    ellipse(x, y, brushSize*weight, brushSize*weight);
  
    if (counter%1000 == 0 && counter !=0) {
      brushSize = brushSize-1;
      if(brushSize<5) brushSize=5;
    }
    counter = counter + 1;
  }
  // cyan = color(0,255,255,100);
  // magenta = color(255,0,255,255);
  // yellow = color(255,255,0);
  // fill(cyan);
  // ellipse(x[0], y[0], brushSize, brushSize);
  // fill(magenta);
  // ellipse(x[1], y[1], brushSize, brushSize);
  

  // noLoop();

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
