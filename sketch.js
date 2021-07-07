var PLAY = 1;
var END = 0;
var WIN = 2
var gameState = PLAY;
var kangaroo, kangaroo_running, kangaroo_collided;
var jungle, invisibleJungle, jungleImage;
var obstacle;
var score = 0;
var gameOver; 
var restart;
var invisibleGround
 

function preload() {
  kangaroo_running = loadAnimation("kangaroo1.png", "kangaroo2.png", "kangaroo3.png");
  kangaroo_collided = loadAnimation("kangaroo1.png");
  jungleImage = loadImage("bg.png")
  obstacle1 = loadImage("stone.png")
  gameOverImage = loadImage ("gameOver.png")
  restartImage = loadImage("restart.png")
  jumpSound = loadSound("jump.wav")
  collidedSound = loadSound("collided.wav")
  shrub1 = loadImage("shrub1.png")
  shrub2 = loadImage("shrub2.png")
  shrub3 = loadImage("shrub3.png")
}

function setup() {
createCanvas(800, 400);
jungle = createSprite(400,100,400,20);
jungle.addImage("jungle",jungleImage);
jungle.x = width /2;

jungle.scale = 0.3
kangaroo = createSprite(50,160,20,50);
kangaroo.addAnimation("running", kangaroo_running);
kangaroo.addAnimation("collided",kangaroo_collided)
kangaroo.scale = 0.15;
kangaroo.setCollider("circle",0,0,3-00)
invisibleGround = createSprite(400,350,1600,10)
invisibleGround.visible = false;
//create a trex sprite

gameOver = createSprite(400,100)
gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5
restart = createSprite(550,140)
restart.addImage(restartImage)
restart.scale = 0.1
gameOver.visible = false
restart.visible = false
//create a ground sprite

shrubsGroup = new Group()
obstaclesGroup = new Group()
}

function draw() {
background(180);
kangaroo.x = camera.position.x - 270
if(gameState === PLAY){
jungle.velocityX = -3
if(jungle.x<100){
  jungle.x = 400
}
kangaroo.collide(invisibleGround);
gameOver.visible = false;
restart.visible = false;
  console.log(kangaroo.y)
//jump when the space button is pressed
if (keyDown("space")&& kangaroo.y >= 150) {
  kangaroo.velocityY = -16;
  jumpSound.play()
}
spawnShrub()
spawnObstacle()
kangaroo.velocityY = kangaroo.velocityY + 0.8
if(score>0 && score%100 === 0 ){
  checkPointSound.play()
}
if(obstaclesGroup.isTouching(kangaroo)){
  
  gameState = END;
  collidedSound.play()
}
if(shrubsGroup.isTouching(kangaroo)){
  score = score + 1
  shrubsGroup.destroyEach()

}
}
  else if(gameState === END){

    gameOver.x = camera.position.x
    restart.x = camera.position.x
    gameOver.visible = true;
    restart.visible = true;
    jungle.velocityX = 0;
    kangaroo.velocityY = 0;
    kangaroo.changeAnimation("collided",kangaroo_collided)
  obstaclesGroup.setVelocityXEach(0)
  shrubsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
 
  
  if(mousePressedOver(restart)){
  reset()
  }
}
else if(gameState === WIN){
  jungle.velocityX = 0
  kangaroo.velocityY = 0 
  obstaclesGroup.setVelocityXEach(0)
  shrubsGroups.setVelocityXEach(0)
  kangaroo.changeAnimation("collided",kangaroo_collided)
  obstaclesGroup.setLifetimeEach(-1)
  shrubsGroup.setLifetimeEach(-1)
}
drawSprites();
textSize(20)
fill("lightblue")
text("score - "+ score,camera.position.x,50)
if(score>= 5 ){
  kangaroo.visible = false
  textSize(30)
  fill("red")
  text("congratulations you have won the game",70,200)
  gameState = WIN
}
}
function reset(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  kangaroo.visible = true
  obstaclesGroup.destroyEach()
  shrubsGroup.destroyEach()
  kangaroo.changeAnimation("running",kangaroo_running)
  score = 0
}
function spawnShrub()
{
 if(frameCount%150 === 0 ){
  shrub = createSprite(camera.position.x+500,330,40,10)

  shrub.scale = 0.6
  shrub.velocityX = -(6+3*score/100)
  var rand = Math.round(random(1,6))
  switch(rand){
    case 1: shrub.addImage(shrub1)
            break;
    case 2: shrub.addImage(shrub2)
            break;
    case 3: shrub.addImage(shrub3)
            break;
    default:break;}
  shrub.scale = 0.05
  shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
   shrub.lifetime = 400
   shrubsGroup.add(shrub)
 }
 }
function spawnObstacle(){
  if(frameCount%120 === 0){
  obstacle = createSprite(camera.position.x + 400,330,40,40)
  obstacle.addImage(obstacle1)
  obstacle.setCollider("rectangle",0,0,200,200)
  obstacle.velocityX = -(6+3*score/100)
    obstacle.scale = 0.15
    obstacle.lifeTime = 400;
    obstaclesGroup.add(obstacle)
  } 
}