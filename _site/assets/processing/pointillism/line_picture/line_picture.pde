PImage img;

void setup() {
  img = loadImage("../car.jpg");
  size(1224, 816);
  background(255);
  strokeWeight(10);
}

float p_x1, p_y1, p_x2, p_y2;
float strokeWidth = 10;
int counter = 1;

void draw() {
  int x1 = int(random(width));
  int y1 = int(random(height));
  int x2 = int(random(width));
  int y2 = int(random(height));
  color pix1 = img.get(x1*4,y1*4);
  color pix2 = img.get(x2*4,y2*4);
  stroke((red(pix1)+red(pix2)/2),(green(pix1)+green(pix2)/2),(blue(pix1)+blue(pix2)/2), 128);
  
  float angle = random(0,180);
  float slope = (float(y1-y2))/float((x1-x2));

  float top_x = x_from_y(x1, y1, slope, 0);
  float bottom_x = x_from_y(x1, y1, slope, height);
  float right_y = y_from_x(x1, y1, slope, width);
  float left_y = y_from_x(x1, y1, slope, 0);
  
  float[][] edges = { { top_x, 0}, { bottom_x, height}, {width, right_y}, {0, left_y}};
  
  boolean top = top_x >= 0 && top_x <= width;
  boolean bottom = bottom_x >= 0 && bottom_x <= width;
  boolean right = right_y >= 0 && right_y <= height;
  boolean left = left_y >= 0 && left_y <= height;
  
  boolean[] edgeList = {top, bottom, right, left};
  

  boolean firstPointFound = false;
  for (int i = 0; i < 4; i++) {
    if (edgeList[i] && firstPointFound) {
      p_x2 = edges[i][0];
      p_y2 = edges[i][1];
    }
    if (edgeList[i] && !firstPointFound) {
      p_x1 = edges[i][0];
      p_y1 = edges[i][1];
      firstPointFound = true;
    }
  }
  
  line(p_x1, p_y1, p_x2, p_y2);
  if(counter%1000==0) {
    strokeWidth = strokeWidth*0.6;
  }  
  strokeWeight(strokeWidth);

}

float y_from_x(int a, int b, float s, float x) {
  return(s*x+b-s*a);
}

float x_from_y(int a, int b, float s, float y) {
  return((y-b+s*a)/s);
}
