function preload() {
  capture = createCapture(VIDEO);
  capture.hide();  

}
function setup() {
  resolution = 2;
  scale_factor = Math.min(windowWidth/capture.width, windowHeight/capture.height);
  var cnv = createCanvas(scale_factor*capture.width, scale_factor*capture.height);
  console.log(capture.width, capture.height);
  cnv.parent(document.getElementById('markdown'));

  pixelDensity(resolution);
  //blendMode(DARKEST);
  background(255);
  //image(img, 0, 0, width, height);
  noStroke();
  //noisee(5,0,0,width,height);
  start_drawing = false;
  brushSize = Math.max(width,height)/20;
  color_intensity = 0.3;

}

var counter = 0;

// num dots to choose each time
var num_circles = 5;

// function draw() {
//   //background(0);
//   if (capture.loadedmetadata) {
//     let c = capture.get(0, 0,capture.width/resolution,capture.height/resolution);
//     image(c, 0, 0);
//   }
function draw() {
  // var x = [];
  // var y = [];
  
  if(!start_drawing) {
    if (capture.loadedmetadata && frameCount > 250) {
      setup();
      img = capture.get(0, 0,capture.width/resolution,capture.height/resolution);
      //image(img,0,0);
      console.log(scale_factor);

      //image(img, 0,0);
      //capture.hide();
      console.log(width, height);
      blendMode(DARKEST);
      start_drawing = true;
    }
  }



  if(start_drawing) { 
    
    for(let j = 0; j < num_circles; j++) {
      
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
          //opacity = 1-rgb[i]/255;
          opacity = cmy[i];
          //cmy[i] = 1;
          rgb[i] = 255;
        }
      }

      // convert to the correct cmyk colour
      var r = (1-cmy[0]*color_intensity)*255;
      var g = (1-cmy[1]*color_intensity)*255;
      var b = (1-cmy[2]*color_intensity)*255;

      fill(r,g,b, 255);
      circleSize = random(0.3,1.1)*brushSize;
      ellipse(resolution*scale_factor*x, resolution*scale_factor*y, circleSize, circleSize);
    
      if (counter%1000 == 0 && counter !=0) {
        brushSize = brushSize*0.985;
        if(counter % 5000 == 0) color_intensity += color_intensity >= 0.95 ? 0 : 0.1;
        console.log(color_intensity, counter);
        if(brushSize<8) brushSize=8;
      }
      counter = counter + 1;

    }
  }
}

var running = true;

function keyPressed() {
  if (key === 's') {
		save('dotFace.png'); 
	}
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