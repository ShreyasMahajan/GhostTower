var PLAY=1;
var END = 0;
var gameState = PLAY;

var ghostrunner, ghostimg;
var bgimg ,bg;
var invisiblegr;
var door,doorimg;
var climber,climberimg;
var sound;
var doorgroup;
var climbergroup;

function preload(){
  ghostimg =loadImage("ghost-standing.png");
  bgimg = loadImage("tower.png");
  doorimg=loadImage("door.png");
  climberimg=loadImage("climber.png");
  sound=loadSound("spooky.wav");
}


function setup(){
  createCanvas(500,600);
  
  bg= createSprite(240,20,20,20);
  bg.addImage(bgimg);
  bg.scale=0.97
  bg.velocityY=2;
  
  
  ghostrunner = createSprite(200,450,50,50);
  ghostrunner.addImage(ghostimg);
  ghostrunner.scale=0.3
  
  invisiblegr = createSprite(0,450,500,0);
  invisiblegr.visible = false;
  //sound.play();
  
  doorgroup = new Group();
  climbergroup = new Group();
  
}


function draw(){
  background(0);
  
  if (gameState===PLAY){
   
  if(keyDown("space")) {
      ghostrunner .velocityY = -4;
    }
  if(keyDown("left_arrow")){
    ghostrunner.x = ghostrunner.x -4;
  }
  if(keyDown("right_arrow")){
    ghostrunner.x = ghostrunner.x +4;
  }
  
  
  
  
    ghostrunner.velocityY =  ghostrunner.velocityY + 0.8
  
    if (bg.y >400){
      bg.y = 300;
  
    }
ghostrunner.collide(invisiblegr);
  spawndoor();
    
    if(ghostrunner.collide(climbergroup)){
      gameState=END
      ghostrunner.destroy();
      bg.destroy();
      climbergroup.destroyEach();
      doorgroup.destroyEach();
    }
  }  
  else if (gameState === END) {
    textSize(40)
    fill("white");
    text("GAME OVER!",120,300);
    
    
    
  
  }
  
  drawSprites();
}

function spawndoor() {
  if(frameCount % 250 === 0) {
    door = createSprite(random(100,400),80);
    door.addImage(doorimg);
    door.lifetime =250;
    
    
    climber = createSprite(door.x,150);
    climber.addImage(climberimg);
    climber.lifetime = 250;
    climber.scale=0.9;
    
    doorgroup.add(door);
    
    climbergroup.add(climber);
   
  }
}
