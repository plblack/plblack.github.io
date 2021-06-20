/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {"UP": 38,
  "DOWN":40,}
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
    repositionGameItem();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN){
      paddleLeft.speedY = 5;
    }
    else if (event.which === KEY.UP){
      paddleLeft.speedY = -5;
    } 
  }
    function handleKeyUp(event){
      if (event.which === KEY.DOWN){
        paddleLeft.speedY = 0;
      }
      else if (event.which === KEY.UP){
        paddleLeft.speedY = 0;
      }
    }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem(){
    paddleLeft.y += paddleLeft.speedY;
  }
  function redrawGameItem(){
    paddleLeft.css("left", X);
    paddleLeft.css("top", Y);
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
