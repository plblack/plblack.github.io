/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {UP: 38,
    DOWN:40,
    w: 87,
    s: 83,}
   leftPlayerScore = 0
   rightPlayerScore = 0
  // Game Item Objects
  function makeItem($elementId) {
    var gameItem = {};
    gameItem.id = $elementId;
    gameItem.x = Number($($elementId).css('left').replace(/[^-\d\.]/g, ''));
    gameItem.y = Number($($elementId).css('top').replace(/[^-\d\.]/g, ''));
    gameItem.width = $($elementId).width();
    gameItem.height = $($elementId).height();  
    gameItem.speedX = 0
    gameItem.speedY = 0
    return gameItem;
  }
  var paddleLeft = makeItem('#paddleLeft');
  var paddleRight = makeItem('#paddleRight');
  var ball = makeItem('#ball');
  function rollDice(sides) {	
    return Math.ceil(Math.random() * sides);	
  }	
  ball.speedX = rollDice(3) 
  ball.speedY = rollDice(3)
  

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                              

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    if(leftPlayerScore == 11){
      endGame();
    }
    if(rightPlayerScore == 11){
      endGame();
    }
    repositionGameItem();
    redrawGameItem();
    if (doCollide(paddleLeft, ball)||
    doCollide(paddleRight,ball)){
      showResult(true);
    } 
    else {
    showResult(false);
}
$("h1").text(leftPlayerScore);
$("h2").text( rightPlayerScore);
  }
  
  /* 
  Called in response to events.
  */

  
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN){
      paddleLeft.speedY = 5;
    }
    if (event.which === KEY.UP){
      paddleLeft.speedY = -5;
    } 
    if (event.which === KEY.s){
      paddleRight.speedY = 5;
    }
   if (event.which === KEY.w){
      paddleRight.speedY = -5;
    } 
  }
    function handleKeyUp(event){
      if (event.which === KEY.DOWN||event.which === KEY.UP){
        paddleLeft.speedY = 0;
      }
      if (event.which === KEY.s||event.which === KEY.w){
        paddleRight.speedY = 0;
      }
    }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem(){
    paddleLeft.y += paddleLeft.speedY;
    paddleRight.y += paddleRight.speedY
    ball.y += ball.speedY
    ball.x += ball.speedX;
    if(paddleLeft.y <= 0){
      paddleLeft.y = 0
    }
    if(paddleLeft.y >= 360){
      paddleLeft.y = 360
    }
    if(paddleRight.y <= 0){
      paddleRight.y = 0
    }
    if(paddleRight.y >= 360){
      paddleRight.y = 360
    }
    //detect ball collision left wall
    if(ball.x <= 0 && ball.y !== 0){
      rightPlayerScore = rightPlayerScore + 1
      ball.x = 220
      ball.y = 220
    }
    //detect ball collision right wall
    if(ball.x >= 442 && ball.y !== 0){
      leftPlayerScore = leftPlayerScore + 1 
      ball.x = 220
      ball.y = 220
    }
    //detect ball collision top wall
    if(ball.y <= 0 && ball.x !== 0){
      ball.speedY = -ball.speedY
    }
    else if(ball.y <= 0 && ball.x == 0){
      ball.speedY = -ball.speedY
      ball.speedX = -ball.speedX
    }
    //detect ball collision bottom wall
    if(ball.y >= 442 && ball.x !== 0){
      ball.speedY = -ball.speedY
    }
}
  function redrawGameItem(){
    $(paddleLeft.id).css("left", paddleLeft.x);
    $(paddleLeft.id).css("top", paddleLeft.y);
    $(paddleRight.id).css("left", paddleRight.x);
    $(paddleRight.id).css("top", paddleRight.y);
    $(ball.id).css("left", ball.x);
    $(ball.id).css("top", ball.y);
  }
  function doCollide(obj1, obj2) {
    obj1.leftX = obj1.x;
   obj1.topY = obj1.y;
  obj1.rightX = obj1.x + $(obj1.id).width();
  obj1.bottomY = obj1.y + $(obj1.id).height();
  
  obj2.leftX = obj2.x;
  obj2.topY = obj2.y; 
  obj2.rightX = obj2.x + $(obj2.id).width();
  obj2.bottomY = obj2.y + $(obj2.id).height();
	if ((obj1.rightX > obj2.leftX) &&
       (obj1.leftX < obj2.rightX) &&
       (obj1.bottomY > obj2.topY) &&
       (obj1.topY < obj2.bottomY)) {
      return true;
    }
  else {
    return false;
  }
  }
  function showResult(result) {if(result === true){
    ball.speedX = -ball.speedX
    ball.speedY = -ball.speedY
}
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }  
}
}
