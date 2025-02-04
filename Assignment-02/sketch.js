let dragging = false;
let selected = -1;
let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(0,0,95);

  let red = color(0,100,100);
  let orange = color(36,100,100);
  let yellow = color(60,100,100);
  let green = color(120,100,100);
  let cyan = color(180,100,100);
  let blue = color(240,100,100);
  let purple = color(320,100,100);
  let brown = color(30,100,40);
  let white = color(0,0,100);
  let black = color(0,0,0);
  
  colors = [red,orange,yellow,green,cyan,blue,purple,brown,white,black];

  selected = colors[0];

}

function draw() {

  strokeWeight(1);
  stroke('white');
  
for(let i = 0; i <= 9; i++) {
  fill(colors[i]);
  square(0, i * 40 , 40);
}

  if(dragging) {
  strokeWeight(10);
  stroke(selected);
  line(pmouseX, pmouseY, mouseX, mouseY);
  }

}

function mousePressed() {
  dragging = true;
  for(let i = 0; i <= 9; i++) {
    if(mouseY >= i * 40 && mouseY < 40 * (i + 1) && mouseX < 40) {
       selected = (colors[i]);
       break;
    }
  }

}

function mouseReleased() {
  dragging = false;
}



