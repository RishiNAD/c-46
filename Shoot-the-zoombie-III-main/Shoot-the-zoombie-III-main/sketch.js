var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var batImg
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 70;
var life = 3;
var score = 0;

var gameState = "fight"


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  bulletImg = loadImage("assets/bullet_image.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  batImg = loadAnimation("assets/b1.png","assets/b2.png","assets/b3.png")
  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

  explosionImg = loadImage("assets/explosion.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    zombieGroup = new Group()
    batGroup = new Group()


}

function draw() {
  background(0); 


if(gameState === "fight"){

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  //go to gameState "lost" when 0 lives are remaining
  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    gameState = "lost"
    
  }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.velocityX = 20
  bullet.scale = 0.1;
  bullet.addImage(bulletImg)
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets
if(bullets==0){
  gameState = "bullet"
    
}

//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      //write a condition for zombiegroup touches bulletGroup
   if(zombieGroup[i].isTouching(bulletGroup)){
    var blast = createSprite(zombieGroup[i].x,zombieGroup[i].y,50,50)   
    blast.addImage(explosionImg)
    blast.scale = 0.3;
    blast.life = 10;
    score = score + 20;
    zombieGroup[i].destroy()

//destroy zombie
        bulletGroup.destroyEach()
  
        } 
  
  }
}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
//Decrease the life
life = life -1;
       } 
 
 }
}

//calling the function to spawn zombies
enemy();
bats();
}

drawSprites();
textSize(100)
fill("red")

text("Score:" + score,displayWidth - 500,displayHeight / 2 - 420)

text("Bullets:" + bullets, displayWidth - 500,displayHeight / 2 - 250)

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  
  text("Score:" + score,displayWidth - 200,displayHeight / 2 - 220)
  text("GAME OVER",400,400)
  text("Bullets:" + bullets, displayWidth - 210,displayHeight / 2 - 250)
 zombieGroup[i].destroy()
 player.destroy()
  //use text to display you lost
  //destroy zombie group
  //destroy player
 

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= false
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }
}
  function bats(){
    if(frameCount%50===0){
  
      //giving random x and y positions for zombie to appear
      bat = createSprite(random(1300,1100),random(20,70),40,40)
      
      bat.addAnimation("Flying bat",batImg)
      bat.scale = 0.2
      bat.velocityX = -3
      bat.debug= false
      bat.setCollider("rectangle",0,0,400,400)
      
      bat.lifetime = 400
     batGroup.add(bat)
    }
  
  }



