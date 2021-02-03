var END = 0, PLAY = 1;
var monkey , monkey_running ;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var Background , Backgroundimage;
var Pbackground , Bbackground;
var prisonMonkey;
var bananaEaten = 0 , timeSurvived = 0;
var jungleSound,eatingsound;
var gameState = PLAY;
var endSound;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  Backgroundimage = loadImage("monkey.jpg");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  prison_monkey = loadImage("prision monkey.jpg");
  jungleSound = loadSound("Jungle.mp3");
  monkeyCollided = loadAnimation("sprite_1.png");
  eatingsound = loadSound("eat.mp3");
  endSound = loadSound("end.mp3");
}



function setup() {
  createCanvas(550,380);
  Pbackground = createSprite(275,370,540,20);
  prisonMonkey = createSprite(200,200);
  prisonMonkey.addImage(prison_monkey);
  prisonMonkey.scale = 2;
  Bbackground = createSprite(600,100);
  Bbackground.addImage(Backgroundimage);
  Bbackground.scale = 3;
  
  Background = createSprite(600,100);
  Background.addImage(Backgroundimage);
  
  Background.scale = 3;
  monkey = createSprite(50,350);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkeyCollided)
  monkey.scale = 0.1;
  //monkey.debug = true;
  monkey.setCollider("circle",0,0,200)
  jungleSound.play();
  jungleSound.loop();
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("white");
  monkey.velocityY += 1;
  
  monkey.collide(Pbackground);
  
  if(gameState===PLAY){
    monkey.changeAnimation("running",monkey_running);
    timeSurvived += Math.round(frameCount % 50 ===0);
    Bbackground.velocityX = -(2+timeSurvived/50);
    Background.velocityX = -(2+timeSurvived/50);
    if(Background.x<80){
  Background.x = Background.width/2;
  }
  if(Pbackground.x<200){
  Pbackground.x = Pbackground.width/2;
  }if(Bbackground.x<180){
  Bbackground.x = Bbackground.width/2;
  }
    spawnfood();
  spawnobstacle();
    if(keyDown("space")&& monkey.y >= 180) {
        monkey.velocityY = -18;
        
    }
  if(monkey.isTouching(FoodGroup)){
    bananaEaten += 1;
    monkey.scale += 0.01;
    eatingsound.play();
    eatingsound.Volume = 100;
    FoodGroup.destroyEach();
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
    endSound.play();
  }
  
  }
  else if(gameState===END){
    monkey.changeAnimation("collided",monkeyCollided);
    monkey.scale = 0.1;
    Bbackground.velocityX = 0;
    Background.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.velocityY = 0;
    
    if(mousePressedOver(monkey)&&gameState===END){
      reset();
    }
  }
  

  drawSprites();
  fill("red");
  textSize(30);
  text("Time Survived: "+ timeSurvived,300,50);
  fill("red");
  textSize(30);
  text("Banana Eaten: "+ bananaEaten,300,100);
  fill("yellow");
  textSize(30);
  text("press on monkey to ",10,50);
  fill("yellow");
  textSize(30);
  text("restart&space to jump ",10,100);
}
function spawnfood() {
  //write code here to spawn the clouds
 if (frameCount % 100 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(180,340));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    banana.setCollider("circle",0,0,155)
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}
function spawnobstacle() {
  //write code here to spawn the clouds
 if (frameCount % 120 === 0) {
    obstacle = createSprite(600,360,40,10);
    obstacle.x = Math.round(random(500,580));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,160)

    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  bananaEaten = 0;
  timeSurvived = 0;
  textSize(30);
  fill("red");
  text("press on monkey to restart",100,150);
}



