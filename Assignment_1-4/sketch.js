let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"

});

let gameState = GameStates.START;
let score = 0;
let time = 30;
let textPadding = 15;
let highScore = 0;
let gameFont;
let sprites = [];
let character = [];


function preload() {
  sprites[0] = loadImage("media/Ship.png");
  gameFont = loadFont("media/Micro5-Regular.ttf"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textFont(gameFont);
  
  for (let i = 0; i < 15; i++) {
    characterLoad(random(96, width-96), random(96, height-96), sprites[0]);
    
    }
}

function draw() {
  background(220);


  /* START Screen */

  switch(gameState) {
    case GameStates.START:

        textAlign(CENTER,CENTER);
        textSize(80);
        text("Press ENTER to Start" , width/2, height/2);

        push();
        image(sprites[0], width/2 - 300, height/2 + 18, 96, 96, 0, 0, 96, 96)
        pop();

        push();
        image(sprites[0], width/2 + 285, height/2 + 18, 96, 96, 0, 0, 96, 96)
        pop();

      break;

    /* PLAY Screen */

    case GameStates.PLAY:
    
    for (let i = 0; i < character.length ; i++) {
      character[i].draw();
      }

        time -= deltaTime / 1000;

        textAlign(LEFT,TOP);
        textSize(50);
        text("Score: " + score, textPadding, textPadding);
        textAlign(RIGHT,TOP);
        text("Time: " + Math.ceil(time), width - textPadding, textPadding);

        if(time <= 0) {
          gameState = GameStates.END;
        }

      break;

      /* END Screen */

    case GameStates.END:

        textSize(80);
        textAlign(CENTER, CENTER);

        text("Game Over!", width/2, height/2 - 85);
        text("Score: " + score, width/2, height/2);

        if (score > highScore) {
          highScore = score; }
        
        if (score === highScore && score != 0) {
          text("New High Score!!: " + highScore, width/2, height/2 + 85);
        } 
        else {
          text("High Score: " + highScore, width/2, height/2 + 85);
        }
          text("Press ENTER to Retry" , width/2, height/2 + 170);

        push();
        image(sprites[0], width/2, height/2 - 200, 864, 96)
        pop();

      break;
  }

}



function keyPressed() {
  switch(gameState) {

    case GameStates.START:
      if(keyCode === ENTER) {
        gameState = GameStates.PLAY;
      }
      break;

    case GameStates.PLAY:
      break;

    case GameStates.END:
    /* Reset Game in END Screen */
      if(keyCode === ENTER) {
        gameState = GameStates.PLAY;
        time = 30;
        score = 0;
        character = [];
        for (let i = 0; i <= 15; i++) {
          characterLoad(random(96, width-96), random(96, height-96), sprites[0]);
          }
      }
      break;
  }
}


class Character {
  constructor(x, y, sprites) {
      this.x = x;
      this.y = y;
      this.sprites = sprites;
      this.currentAnimation; 
      this.animations = {};
      this.direction = random([-1, 1]);
      this.speed = 1;
      this.frameCount = 0;
      this.destroyed = false;

  }

  addAnimation(direction, animation) {
      this.animations[direction] = animation;
  }

  draw() {
    if(this.destroyed === false) {
      this.x += this.speed * this.direction;

      if(this.x <= 96 || this.x >= width - 96) {
        this.direction *= -1;
      }

      this.currentAnimation = this.direction === 1 ? 'right' : 'left';
    } else { this.currentAnimation = 'destroyed';}

      let animation = this.animations[this.currentAnimation];
     
      if(animation) {
          
          push();
          translate(this.x, this.y);
          scale(this.direction, 1);
          animation.draw(this.frameCount);
          pop();
          this.frameCount++;
      } else {
          image(this.sprites, this.x, this.y, 96,96,0,0,96,96)
          scale(this.direction, 1);
      }
  }

  destroy(mx, my) {
    let click = dist(mx, my, this.x, this.y);
    if ( click < 48 && this.destroyed === false) {
      this.destroyed = true;
      /* Increase Score */
      score += 1;
      /* Increase Character Speed */
      for (let i = 0; i < character.length; i++) {
      character[i].speed += 3;
      }
    }
  }


}

class SpriteAnimation {
constructor(spritesheet, startU, startV, duration) {
  this.spritesheet = spritesheet;
  this.u = startU;
  this.v = startV;
  this.frameCount = 0;
  this.duration = duration;
  this.startU = startU;
  this.flipped = false;
}

draw() {
  let s = (this.flipped) ? -1 : 1
  scale(s,1);
  image(this.spritesheet, 0, 0, 96, 96, this.u*96, this.v*96, 96, 96);

  this.frameCount++;
  if(this.frameCount % 5 === 0)
  this.u++;
  if (this.u === this.startU + this.duration) 
      this.u = this.startU;
}


}

function mousePressed() {
  for (let i = character.length - 1; i >= 0; i--) {
    character[i].destroy(mouseX, mouseY);
  }
}

function characterLoad(x, y, sprites) {   
    
  let characterAnimation = new Character(x, y, sprites);
  characterAnimation.addAnimation("left", new SpriteAnimation(sprites, 0, 0, 8));
  characterAnimation.addAnimation("right", new SpriteAnimation(sprites, 0, 0, 8));
  characterAnimation.addAnimation("destroyed", new SpriteAnimation(sprites, 8, 0, 1));
  character.push(characterAnimation);
}
