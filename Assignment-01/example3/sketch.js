function setup() {
  createCanvas(500, 250);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  background(0,0,0);

  fill('yellow');
  arc(120,125,200,200,225,135);

  fill('red');
  noStroke();
  rect(275,125,200,100);
  arc(375,125,200,200,180,360);

  fill('white')
  circle(325,125,55);

  fill('white')
  circle(425,125,55);


  fill('blue')
  circle(325,125,35);

  fill('blue')
  circle(425,125,35);
  

}
