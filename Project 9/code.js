var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a0d7fa7f-52e6-47e8-8b2d-997777537daa","21d9d053-77c6-4d24-9e4b-3c83dae749f0","a1a93e22-c093-4df6-914c-3825b2c19674"],"propsByKey":{"a0d7fa7f-52e6-47e8-8b2d-997777537daa":{"name":"puck","sourceUrl":"assets/api/v1/animation-library/gamelab/wcuV7DcPEac2EjLNAPemwiDn.zqV1cHa/category_sports/puck.png","frameSize":{"x":393,"y":243},"frameCount":1,"looping":true,"frameDelay":2,"version":"wcuV7DcPEac2EjLNAPemwiDn.zqV1cHa","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":243},"rootRelativePath":"assets/api/v1/animation-library/gamelab/wcuV7DcPEac2EjLNAPemwiDn.zqV1cHa/category_sports/puck.png"},"21d9d053-77c6-4d24-9e4b-3c83dae749f0":{"name":"Player","sourceUrl":"assets/api/v1/animation-library/gamelab/Micr7M2DpXkizJCCzeoio.1zkx3PjfqT/category_tools/hoe_iron.png","frameSize":{"x":128,"y":128},"frameCount":1,"looping":true,"frameDelay":2,"version":"Micr7M2DpXkizJCCzeoio.1zkx3PjfqT","categories":["tools"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":128,"y":128},"rootRelativePath":"assets/api/v1/animation-library/gamelab/Micr7M2DpXkizJCCzeoio.1zkx3PjfqT/category_tools/hoe_iron.png"},"a1a93e22-c093-4df6-914c-3825b2c19674":{"name":"computer","sourceUrl":"assets/api/v1/animation-library/gamelab/V.XdfSBRoik6ZhHEDsqjURkxVsV9KVZJ/category_tools/hoe_silver.png","frameSize":{"x":128,"y":128},"frameCount":1,"looping":true,"frameDelay":2,"version":"V.XdfSBRoik6ZhHEDsqjURkxVsV9KVZJ","categories":["tools"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":128,"y":128},"rootRelativePath":"assets/api/v1/animation-library/gamelab/V.XdfSBRoik6ZhHEDsqjURkxVsV9KVZJ/category_tools/hoe_silver.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var goal1=createSprite(200,20,100,10);
goal1.shapeColor="red";

var goal2 = createSprite(200,380,100,10);
goal2.shapeColor = "red";



var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor="black";

var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor="black";

var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor="black";

var boundary4 = createSprite(400,200, 10, 400);
boundary4.shapeColor="black";

var gameState="serve"; 

var puck = createSprite(200,200,10,10);
puck.shapeColor="white";
puck.setAnimation("puck");
puck.scale=0.1;

var computer = createSprite(200,50,50,10);
computer.shapeColor="blue";
computer.setAnimation("computer");
computer.scale=0.5;

var player = createSprite(200,350,50,10);
player.shapeColor="blue";
player.setAnimation("Player");
player.scale=0.5;

var compscore = 0;
var playerscore = 0;


function draw() {
  background("gray");
  
  textSize(20);
  fill("black");
  text(compscore, 25, 185);
  text(playerscore,25, 225);
  
  for(var i = 0; i < 400; i=i+20){
    line(i,200,i+10,200);
  }
  createEdgeSprites();
  
  puck.bounceOff(edges);
  puck.bounceOff(player);
  puck.bounceOff(computer);
  
  player.bounceOff(edges);
  computer.bounceOff(edges);
  
  if(gameState=="serve"){
    textSize("20");
    fill("black");
    text("Press Space To Start", 100,180);
    if(keyDown("space")){
      puck.velocityX = 10;
      puck.velocityY = 5;
      gameState="play";
    }
  }
  
  if(gameState=="play"){
    computer.x=puck.x;
    paddleMovement();
    if(keyDown("space"))
    {
      puck.velocityX = 10;
      puck.velocityY = 5;
    }
    if(playerscore==5||compscore==5)
    {
      gameState="end";
    }
  }
  
  if(gameState=="end"){
    textSize(50);
    fill("lime");
    text("Game Over!", 90, 250);
  }
  if(puck.isTouching(goal1)){
    compscore=compscore+1;
    puck.x=200;
    puck.y=200;
    puck.velocityX=0;
    puck.velocityY=0;
  }
  
   if(puck.isTouching(goal2)){
    compscore=compscore+1;
    puck.x=200;
    puck.y=200;
    puck.velocityX=0;
    puck.velocityY=0;
   }
   
  
  
  
  
  
  
drawSprites();
}

function paddleMovement(){
  
  if(keyDown("left")){
    player.x=player.x-10;
  }
  
  if(keyDown("right")){
    player.x = player.x+10;
    
  }
  
  
  if(keyDown("up")){
   if(player.y>275 )
   {
    player.y = player.y-10;
   }
  }
  
  if(keyDown("DOWN_ARROW")){
    if(player.y<125)
   {
    player.y = player.y+10;
   }
  }
}




// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
