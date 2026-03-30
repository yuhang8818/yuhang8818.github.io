// Programming for Digital Media
// Assignment 1
// Yuhang Zhao – 3192538 – zhaoyuhangbme@gmail.com
let lx;
let ly;
let ax;
let ay;
function setup() {
  createCanvas(800, 800);
  //No loops allowed.
  noLoop();
}

function draw() {
  background(220);
  //Draw lines between two points located on two adjacent edges of the canvas: one point has random coordinates along its edge, while the point on the other edge increases progressively along the x or y axis；
  //Set variables that can increment horizontally and vertically, x and y;
  for(let x=0;x<width+10;x+=10){
    for(let y=0;y<height;y+=10){
      //Set the line thickness
    strokeWeight(0.1);
      //Set the line color and transparency;
    stroke(0,100);
      //Lines passing through the left edge and the bottom edge;
      line(0,random(height),x,height);
      //Lines passing through the bottom and right edges;
      line(random(width),height,width,y);
      //Lines passing through the right and top edges;
      line(width,random(height),x,0);
      //Lines passing through the top and left edges;
      line(random(width),0,0,y);
    }
  }
  //Set up grid coordinates (x, y);Set the arc and circle with increasing radii so that they can overlap, creating a sense of depth;
  for(let ax=width/16;ax<width;ax+=50){
    for(let ay=height/16;ay<height;ay+=50){
      for(let ar=0;ar<50;ar+=10){
        //Fill the arc with random red and green tones, and set the transparency;
      fill(random(255),random(255),0,30);
        //No stroke;
      noStroke();
        //Draw arcs on the grid with random starting and ending angles, and layer them on top of each other;
      arc(ax,ay,ar,ar,random(TWO_PI),random(TWO_PI));
        //Fill the circles with random blue-green colors and set the transparency;
      fill(0,random(255),random(255));
        //No stroke;
      noStroke();
        //Draw circles with random radii on the grid;
      circle(ax,ay,random(10));   
        //Connect 2/3 of the grid points on the canvas with lines, and draw perspective lines passing through the grid points and the canvas center;
        //Draw overlapping squares on the remaining parts of the grid, all starting from the same initial point, with random side lengths.
        if(ay<height*2/3){
          //Set the line width, transparency, and color;
          strokeWeight(1);
          stroke(255,50);
          //Draw perspective lines connecting the grid points to the center of the canvas;
          line(ax,ay,width/2,height/2);
          //Connect the vertical lines of the grid;
          line(ax,ay,ax,500);
          //Connect the horizontal lines of the grid;
          line(ax,ay,50,ay)
        }else{
          //Fill the squares with random blue-green tones and set the transparency;
          fill(0,random(255),random(255),20);
          //Stroke the squares, setting the opacity and line width.
          stroke(255,50);
          strokeWeight(1);
          //Because the squares’ starting point is the top-left corner, to keep the largest square within the grid, you need to offset the x and y coordinates toward the top-left by half of the square’s width;
          square(ax-25,ay-25,random(50))
        }
        
      }
    }
  }
  //Finally, draw two randomly intersecting lines;
  //Assign values to variables first; if you skip this step and directly use `random()` for the line coordinates, you won’t be able to create lines that are parallel to the x or y axis;
  let lx=random(width);
  let ly=random(height);
  //Set the line color to red-blue tones and give it a random line width;
  strokeWeight(random(10));
  stroke(random(255),0,random(255));
  line(lx,0,lx,height);
  line(0,ly,width,ly);
  
}
