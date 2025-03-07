let polySynth;
let keyGreen = {};
let activeKey = null;
let notes = {
    'a': 'C4',
    's': 'D4',
    'd': 'E4',
    'f': 'F4',
    'g': 'G4',
    'h': 'A4',
    'j': 'B4',
    'k': 'C5',
  }  ;

function setup() {
  createCanvas(400, 400);
  polySynth = new Tone.PolySynth(Tone.Synth).toDestination();

  reverb = new Tone.Reverb({ decay: 20, wet: 0.5 }).toDestination();
  polySynth.connect(reverb);

  reverbSlider = createSlider(0, 1, 0.5, 0.01);
  reverbSlider.position(175, 225);
  reverbSlider.style('width', '300px');
  reverbSlider.style('transform', 'rotate(-90deg)');
  reverbSlider.style('color', 'black');
}

function draw() {
  background(220);

  let notesArr = Object.keys(notes);

  for(let i = 0; i < notesArr.length; i++) {
    let key = notesArr[i];
    let note = notes[key];
    if (keyGreen[key] == true) {
      fill('green');
    } else {
    fill('white');}
    rect(0, i * 50, 250, 50);

    fill('black');
    textSize(20);
    textAlign(CENTER,CENTER);
    text(`${note}: Press Key ${key}`, 90, i * 50 + 25);
  }
 
  fill('lightblue');
  rect(250,0,150,400);
  fill('black');
  text('Reverb', 325, 30);
  text('Slider', 325, 55);
  reverb.wet.value = reverbSlider.value();
}

function keyPressed() {
  
  let pitch = notes[key];
  
  if (pitch &&  key !== activeKey) {
    
    
    polySynth.triggerAttack(pitch);
    keyGreen[key] = true;
  } 

  
}

function keyReleased() {
 
  let pitch = notes[key]
  if (key === activeKey) {
    polySynth.triggerRelease(pitch);
    delete keyGreen[key];
    
  } else if (pitch) {
    polySynth.triggerRelease(pitch);
    delete keyGreen[key];
  }
}
