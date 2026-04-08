/* PROPERTIES OF SNAKE
* moves(up, down, left, right)
* eats apple if snakes coordinates and apples coordiantes coincide
*
*              
*/
class Snake {
  // Snake class fields
  boundX = null; // x-boundary
  boundY = null;  // y-boundary
  velocity = null; // speed of snake

  constructor(config) {

  }
}

//const snake = new Snake(); 

//const apple = new Apple();

/*
window.onload = () => {
  console.log('Page loaded!');
  runGame();
}
*/ 
function runGame() {
  //setInterval(show,30); // 30 represents FPS(frames per second) 
}

function show() {
  //window.location.reload();
  if(window.localStorage) {
    window.localStorage.getItem("REMEMBER ME!!!");
  }
}

// asnyc timeout 
const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms));

(async () => {
  console.log("Waiting 3 seconds...");
  
  await sleep(3000); // Now the code actually pauses here
  
  console.log("Reloading now!");
  window.location.reload(); 
})();
/*
runGame();
document.querySelector()
localStorage.setItem("")
await sleep(2000);
document.body.innerHTML = "";
await sleep(2000);
*/

// if last keystroke is the same, no change needed
let lastKeyDown;
/* 
captures users keystrokes
only valid inputs are: WASD or ArrowUp,ArrowDown,ArrowLeft,ArrowRight 
*/
document.addEventListener("keydown", (event) => {
  if((event.key == "w" || event.key == "ArrowUp") &&  lastKeyDown !== event.key) {
    lastKeyDown = event.key; // update lastKeyDown 
    console.log(event.key);
  }
  if((event.key == "a" || event.key == "ArrowLeft") && lastKeyDown !== event.key) {
    lastKeyDown = event.key;
    console.log(event.key);
  }
  if((event.key == "s" || event.key == "ArrowDown") && lastKeyDown !== event.key) {
    lastKeyDown = event.key;
    console.log(event.key);
  }
  if((event.key == "d" || event.key == "ArrowRight") && lastKeyDown !== event.key) {
    lastKeyDown = event.key;
    console.log(event.key);
  }
});