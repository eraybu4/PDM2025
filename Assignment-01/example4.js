function setup() {
  createCanvas(500, 500);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(240,100,60);

  stroke('white');
  strokeWeight(7);
  fill(110,100,50);
  circle(250,250,250)

 

  fill('red');
  beginShape();
  vertex(250,125);
  vertex(280,215);
  
  vertex(370,215);
  vertex(295,265);

  vertex(330,350);
  vertex(250,295);

  vertex(170,350);
  vertex(205,265); 

  vertex(130,215);
  vertex(220,215);


  endShape(CLOSE);

}
