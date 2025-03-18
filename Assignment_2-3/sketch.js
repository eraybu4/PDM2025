let noise1, noiseEnv, filt1;
let fireworks = [];
let img;

function preload() {
  img = (loadImage('media/firework.png'));
}

function setup() {
  createCanvas(400, 400);

  userStartAudio();
  
  filt1 = new Tone.Filter({
    frequency: 3000,  
    type: "lowpass",
    rolloff: -24,
  }).toDestination();

  noise1 = new Tone.Noise("white");

  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.01,  
    decay: 1.5,    
    sustain: 0,    
    release: 0.7   
  });
  
  
  noise1.connect(noiseEnv);
  noiseEnv.connect(filt1);
  
  
  
}

function draw() {
  background(0);

     // Display active fireworks.
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let fw = fireworks[i];
    imageMode(CENTER);
    
    image(img, fw.x, fw.y, 100, 102);
    fw.timer--; 
    
    
    if (fw.timer <= 0) {
      fireworks.splice(i, 1);
    }
  }
}

function mouseClicked() {
  
    Tone.start();
  noise1.start();
    noiseEnv.triggerAttackRelease(0.5);
    fireworks.push({ x: mouseX, y: mouseY, timer: 60 });
    console.log('Explosion sound triggered');
  
}
