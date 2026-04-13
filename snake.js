const gridCanvas = document.querySelector('.static-grid'); 
const gameCanvas = document.querySelector('.dynamic-foreground');
gameCanvas.height = gridCanvas.height = 650; 
gameCanvas.width = gridCanvas.width = 750;

let sizeOfSquare = 50;

const bground = gridCanvas.getContext('2d');
const fground = gameCanvas.getContext('2d');
// 15 row
for(let row = 0; row < gridCanvas.width; row += sizeOfSquare) {
  // 13 col
  for (let col = 0; col < gridCanvas.height; col += sizeOfSquare) {
    // set color of square based on index
    const isEven = (row / sizeOfSquare + col / sizeOfSquare) % 2 === 0; 
    bground.fillStyle = isEven ? "black" : "gray";
    bground.fillRect(row,col,sizeOfSquare,sizeOfSquare);

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
  xOrigin = sizeOfSquare * 5;  
  yOrigin = sizeOfSquare * 7;
  dx = 50; 
  dy = 50; 
  constructor(x, y) {
    // coordinates of snake origin
    this.x = x;
    this.y = y;
    this.width = sizeOfSquare;
    this.height = sizeOfSquare;
  }

  draw() {
    fground.fillStyle = "green";
    fground.fillRect(this.x, this.y, sizeOfSquare, sizeOfSquare);
  }

  update() {
    fground.clearRect(this.x,this.y, sizeOfSquare, sizeOfSquare);
    this.x += this.dx;
    this.draw();

  }
}

class Apple {

  constructor() {

  }
}

const snake = new Snake(sizeOfSquare * 5, sizeOfSquare * 7); 
snake.draw();

//const apple = new Apple();
let lastTime = 0;
let moveInterval = 1000; // 1000ms = 1 s
function animate(timestamp) {
  requestAnimationFrame(animate); 

  const deltaTime = timestamp - lastTime;

  if(deltaTime >= moveInterval) {
    snake.update();
    lastTime = timestamp; 
  }
}
animate(0); // pass an initial 0 to start the clock
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