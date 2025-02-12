let sprites = [];
let character = [];

function preload() {
  sprites[0] = loadImage("media/monk.png");
  sprites[1] = loadImage("media/meatboy.png");
  sprites[2] = loadImage("media/jungle_warrior.png");
}


function setup() {

  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  characterGen(random(80, width-80), random(80, height-80), sprites[0]);
  characterGen(random(80, width-80), random(80, height-80), sprites[1]);
  characterGen(random(80, width-80), random(80, height-80), sprites[2]);
  

 

}

function draw() {
  background(220);

  for (let i = 0; i < character.length ; i++) {
  character[i].draw();
  
  
  }
}

function keyPressed() {
    for (let i = 0; i < character.length ; i++) {character[i].keyPressed();}
    
}

function keyReleased() {
    for (let i = 0; i < character.length ; i++) {character[i].keyReleased();}
    
}

class Character {
    constructor(x, y, sprites) {
        this.x = x;
        this.y = y;
        this.sprites = sprites;
        this.currentAnimation = 'idle';
        this.animations = {};
    }

    addAnimation(key, animation) {
        this.animations[key] = animation;
    }

    draw() {
        let animation = this.animations[this.currentAnimation];
       
        if(animation) {
            switch (this.currentAnimation) {
                case "left":
                    this.x -=2;
                    break;
                case "right":
                    this.x += 2;
                    break;
            }
            push();
            translate(this.x, this.y);
            animation.draw();
            pop();
        } else {
            image(this.sprites, this.x, this.y, 80,80,0,0,80,80)
        }
    }

    keyPressed() {
        switch(keyCode) {
            case LEFT_ARROW:
                this.currentAnimation = "left";
                this.animations[this.currentAnimation].flipped = true;
                break;
            case RIGHT_ARROW:
                this.currentAnimation = "right";
                break;
        }
    }
    
    keyReleased() {
        this.currentAnimation = "idle";
    }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {
    let s = (this.flipped) ? -1 : 1
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if(this.frameCount % 10 === 0)
    this.u++;
    if (this.u === this.startU + this.duration) 
        this.u = this.startU;
  }
}

function characterGen(x, y, sprites) {   
    
    let characterAnimation = new Character(x, y, sprites);
    characterAnimation.addAnimation("left", new SpriteAnimation(sprites, 0, 0, 9));
    characterAnimation.addAnimation("right", new SpriteAnimation(sprites, 0, 0, 9));
    characterAnimation.addAnimation("idle", new SpriteAnimation(sprites, 0, 0, 1));
    character.push(characterAnimation);
  }
