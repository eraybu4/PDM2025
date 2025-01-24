function setup() {
  createCanvas(500, 500);
  colorMode(HSB);
}

function draw() {
  background(0,0,100);

  noStroke();
  fill(0,100,100,0.5);
  circle(250,170,250);

  fill(240,100,100,0.5);
  circle(170,320,250);

  fill(120,100,100,0.5);
  circle(330,320,250);

}
