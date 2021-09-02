var player,bg,playerimg,opponentimg,opponentimg2
var opponent,opponentGroup,opponent2,opponentGroup2
var bullet,bulletGroup
var score,life
var gameState="play"
function preload(){
  bg=loadImage("bg.jpg")
  playerimg=loadImage("ss (2).png")
  opponentimg=loadImage("og (2).png")
  opponentimg2=loadImage("opponent2.png")
}

function setup() {
  createCanvas(displayWidth-100,displayHeight-100);
 player=createSprite(width/2,height-120,100,10)
 player.addImage(playerimg)
 player.scale=0.4
 opponentGroup=new Group();
 bulletGroup=new Group();
  opponentGroup2=new Group();
  score=0;
  life=3;
}

function draw() {
  background(bg);  
  if(gameState==="play"){
    player.x=mouseX
  
    spawnOpponent();
    spawnOpponent2();
    
   if(keyDown("space")){
     shoot();
   }
   if(bulletGroup.isTouching(opponentGroup)){
   score=score+10
     opponentGroup.destroyEach()
   }
   if(bulletGroup.isTouching(opponentGroup2)){
   score=score+20
     opponentGroup2.destroyEach()
   }
if(opponentGroup.isTouching(player)||opponentGroup2.isTouching(player)) {
  life--;
  player.x=10;
  if(life<=0){
    gameState="end"
  }
  
} 
drawSprites();
  }
  if(gameState==="end"){
    drawSprites();
    console.log("end");
    textSize(50)
    fill("red")
    text("GAME OVER",width/2-100,height/2-100)
    text("Press R to restart",width/2-100,height/2+50)
    if(keyDown("R")){
      gameState="play";
    }
  }
//bounceOff(movingRect,fixedRect)
textSize(20)
fill("red")
text("Score:"+score,width-200,100)

}
function shoot(){
  bullet=createSprite(player.x,player.y,10,10)
  bullet.shapeColor="red"
  bulletGroup.add(bullet)
  bullet.velocityY=-4
}
function spawnOpponent(){
  if(frameCount%100===0){
    opponent=createSprite(random(50,width-150),0,10,10)
    opponent.addImage(opponentimg)
    opponent.scale=0.3
    opponent.mirrorY(-1)
    opponent.velocityY=+4
    opponentGroup.add(opponent)
  }
  
}
function spawnOpponent2(){
  if(frameCount%120===0){
    opponent2=createSprite(random(50,width-150),0,10,10)
    opponent2.addImage(opponentimg2)
    opponent2.scale=0.3
    opponent.mirrorY(-2)
    opponent2.velocityY=+4
    opponentGroup2.add(opponent2)
  }
}
