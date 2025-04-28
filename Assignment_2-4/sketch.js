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

   
  beep = new Tone.Oscillator({
    frequency: 440,  
    type: "sine"
  
  });



  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.01,  
    decay: 0.2,    
    sustain: 0,    
    release: 0.2   
  }).toDestination();
  
  
  beep.connect(noiseEnv);
  
  beep.start();
  
  
  backgroundSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 2, decay: 2, sustain: 0.6, release: 4 }
    }).toDestination();
  
  backgroundSynth.volume.value = -20; 
  
   
  background = new Tone.Loop((time) => {
      backgroundSynth.triggerAttackRelease(["C4", "E4", "G4"], "2n", time); 
    }, "4n"); 
    
    
    
  background.start();
  Tone.Transport.start();
   
 
 drawOsc = new Tone.Oscillator({
  frequency: 300,
  type: "sine"
});

drawGain = new Tone.Gain(0.1).toDestination(); 
drawOsc.connect(drawGain);
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

  let elapsed = millis() - drawStartTime;
    let newFreq = 300 + elapsed * 0.1; 
    newFreq = constrain(newFreq, 300, 1200); 
    drawOsc.frequency.value = newFreq;
  }

}

function mousePressed() {
  dragging = true;
  for(let i = 0; i <= 9; i++) {
    if(mouseY >= i * 40 && mouseY < 40 * (i + 1) && mouseX < 40) {
       selected = (colors[i]);
         
       Tone.start();
      noiseEnv.triggerAttackRelease(0.5);
       break;
    }
  }

  drawStartTime = millis();
  drawOsc.start();

}

function mouseReleased() {
  dragging = false;
  drawOsc.stop();
}
