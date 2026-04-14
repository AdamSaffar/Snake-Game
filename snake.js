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
  dx = 0; 
  dy = 0; 
  constructor(x, y) {
    // coordinates of snake origin
    this.x = x;
    this.y = y;
    this.width = sizeOfSquare;
    this.height = sizeOfSquare;
  } 
  reset() {
    this.x = this.xOrigin;
    this.y = this.yOrigin; 
    this.dx = 0; // stop movement 
    this.dy = 0; // stop movement

    fground.clearRect(0,0,gameCanvas.width,gameCanvas.height);
    this.draw();

    // IMPORTANT: reset state of lastKeyDown so user can pick any new direction
    lastKeyDown = "";
  }
  draw() {
    fground.fillStyle = "green";
    fground.fillRect(this.x, this.y, sizeOfSquare, sizeOfSquare);
  }

  update() {
    fground.clearRect(this.x,this.y, sizeOfSquare, sizeOfSquare);
    this.x += this.dx;
    this.y += this.dy;
    this.draw();

  }
  updateDirection(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  outOfBounds() {
    if(this.x > gameCanvas.width || this.y > gameCanvas.height || this.x < 0 || this.y < 0) {
      return true; 
    } else {
      return false; 
    }
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
let moveInterval = 100; // 500ms = 0.5 sec
function animate(timestamp) {
  requestAnimationFrame(animate); 
  if(snake.outOfBounds()) {
    console.log("OUT OF BOUNDS!");
    snake.reset();
    return; // exit the frame immediately
  }
  const deltaTime = timestamp - lastTime;
  // only update if 
  if(deltaTime >= moveInterval) {
    snake.update();
    lastTime = timestamp; 
  }
}
animate(0); // pass an initial 0 to start the clock

// if last keystroke is the same, no change needed
let lastKeyDown;
// captures users keystroke inputs
document.addEventListener("keydown", (event) => {
  if((event.key == "w" || event.key == "ArrowUp") &&  lastKeyDown !== event.key) {
    // snake cannot turn into itself 
    if(lastKeyDown !=="s") {
      snake.updateDirection(0,-sizeOfSquare); 
    }
    lastKeyDown = event.key; // update lastKeyDown 
  }
  if((event.key == "a" || event.key == "ArrowLeft") && lastKeyDown !== event.key) {
    if(lastKeyDown !== "d") {
      snake.updateDirection(-sizeOfSquare,0);
    }
    lastKeyDown = event.key;
  }
  if((event.key == "s" || event.key == "ArrowDown") && lastKeyDown !== event.key) {
    if(lastKeyDown !== "w") {
      snake.updateDirection(0,sizeOfSquare);
    }    
    lastKeyDown = event.key;
  }
  if((event.key == "d" || event.key == "ArrowRight") && lastKeyDown !== event.key) {
    if(lastKeyDown !== "a") {
      snake.updateDirection(sizeOfSquare,0);
    }
    lastKeyDown = event.key;
  }
});