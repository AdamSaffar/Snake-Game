const canvas = document.querySelector('canvas'); 
canvas.height = 600; 
canvas.width = 750;

let sizeOfSquare = 50;
let lastColor;

const c = canvas.getContext('2d');
// 15 row
for(let row = 0; row < canvas.width; row += sizeOfSquare) {
  // 12 col
  for (let col = 0; col < canvas.height; col += sizeOfSquare) {
    // set color of square based on index
    const isEven = (row / sizeOfSquare + col / sizeOfSquare) % 2 === 0; 
    c.fillStyle = isEven ? "black" : "gray";
    c.fillRect(row,col,sizeOfSquare,sizeOfSquare);

  }
}

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
  dx = null; 
  dy = null; 
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
/* 
// asnyc timeout 
const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms));

(async () => {
  console.log("Waiting 3 seconds...");
  
  await sleep(3000); // Now the code actually pauses here
  
  console.log("Reloading now!");
  window.location.reload(); 
})();

*/
// if last keystroke is the same, no change needed
let lastKeyDown;
// captures users keystroke inputs
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