var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var score = 0

var newImage;

var gamestate = "play"



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacleImage = loadImage("obstacle1.png")

  obstacle1Image = loadImage("obstacle2.png")

  obstacle2Image = loadImage("obstacle3.png")

  obstacle3Image = loadImage("obstacle4.png")

  obstacle4Image = loadImage("obstacle5.png")

  obstacle5Image = loadImage("obstacle6.png")

  gameOverImage = loadImage("gameOver.png")

  restartImage = loadImage("restart.png")



 
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  trex = createSprite(50,windowHeight - 40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  //trex.debug = true
  //trex.setCollider("rectangle", 0,0,200,200)
  
  ground = createSprite(200,windowHeight - 20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  gameOver = createSprite(windowWidth/2,windowHeight/2 - 20)
  gameOver.addImage(gameOverImage)
  restart = createSprite(windowWidth/2, windowHeight/2 + 20)
  restart.addImage(restartImage)
  restart.scale = .8
  gameOver.scale = .8


  invisibleGround = createSprite(200,windowHeight - 10,400,10);
  invisibleGround.visible = false;

  gameOver.visible = false
  restart.visible  = false
  
  console.log("Hello"+ 5)

  obstaclesgroup = new Group()
  cloudsgroup = new Group()
  
}

function draw() {
  background(180);
  textSize(20)
text("Score : "+score,windowWidth - 150,20) 

if(gamestate === "play")
{ restart.visible = false
  gameOver.visible = false
  ground.velocityX = -4;
  if((keyDown("space") || touches.length > 0) && trex.y >= 100) {
    trex.velocityY = -10;
    touches = []
  }
  trex.velocityY = trex.velocityY + 0.8
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles()
  score = score + Math.round(getFrameRate() / 60)
  if(obstaclesgroup.isTouching(trex)){
    gamestate = "end"

  }

}
else if(gamestate === "end"){
ground.velocityX = 0
obstaclesgroup.setVelocityXEach(0)
cloudsgroup.setVelocityXEach(0)
obstaclesgroup.setLifetimeEach(-1)
cloudsgroup.setLifetimeEach(-1)
trex.changeAnimation("collided", trex_collided)
gameOver.visible = true
restart.visible  = true

if(mousePressedOver(restart)){
reset()
  

}

}
  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudsgroup.add(cloud)
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}

function spawnObstacles(){

  if (frameCount % 60 === 0){
    obstacle = createSprite(600,windowHeight - 40,20,20)
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.4
    obstacle.velocityX = -3
    obstacle.lifetime = 200

    var rand = Math.round(random(1,4))
    switch(rand){
      case 1: obstacle.addImage(obstacleImage)
      break

      case 2: obstacle.addImage(obstacle1Image)
      break

      case 3: obstacle.addImage(obstacle2Image)
      break

      case 4: obstacle.addImage(obstacle3Image)
      break

      case 5: obstacle.addImage(obstacle4Image)
      break

      case 6: obstacle.addImage(obstacle5Image)
      break


    }
    obstaclesgroup.add(obstacle)
    
  }

}



function reset(){
  gamestate = "play"
obstaclesgroup.destroyEach()
cloudsgroup.destroyEach()
trex.changeAnimation("running", trex_running)
score = 0
}