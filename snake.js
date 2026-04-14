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
  xOrigin = sizeOfSquare * 4;  
  yOrigin = sizeOfSquare * 6;
  dx = 0; 
  dy = 0; 
  constructor() {
    // coordinates of snake origin
    this.coords = [{x: this.xOrigin, y: this.yOrigin}];
    this.width = sizeOfSquare;
    this.height = sizeOfSquare;
  } 
  reset(apple) {
    // reset snake position to origin
    this.coords = [{x: this.xOrigin, y: this.yOrigin}];
    // reset velocity to 0
    this.dx = 0; 
    this.dy = 0; 

    // reset apple position to origin
    apple.x = apple.xOrigin;
    apple.y = apple.yOrigin; 
    // clear canvas
    fground.clearRect(0,0,gameCanvas.width,gameCanvas.height);
    this.draw();
    apple.draw();

    // IMPORTANT: reset state of lastKeyDown so user can pick any new direction
    lastKeyDown = "";
  }
  draw() {
    fground.fillStyle = "green";
    this.coords.forEach((seg) => {
      fground.fillRect(seg.x,seg.y,sizeOfSquare,sizeOfSquare);
    });
  }

  update(ateApple) {
    const newHead = {
      x: this.coords[0].x + this.dx,
      y: this.coords[0].y + this.dy
    };
    // add newHead to beginning of array
    this.coords.unshift(newHead);

    if(!ateApple) {
      // remove last element from array of coords
      this.coords.pop();
    } else {
      console.log("Grew Snake!");
    }
    this.draw();

  }
  updateDirection(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }

  outOfBounds() {
    // checks if head of snake goes out of bounds
    if(this.coords[0].x >= gameCanvas.width || this.coords[0].y >= gameCanvas.height || this.coords[0].x < 0 || this.coords[0].y < 0) {
      return true; 
    } else {
      return false; 
    }
  }

  isOverlap() {
    // slice() method creates a temp copy of the array starting from the second element
    return this.coords?.slice(1)
      .some((seg) => {
        // if head coincides with the body there is overlap 
        if(this.coords[0].x === seg?.x && this.coords[0].y === seg?.y) {
          return true;
        } else {
          return false;
        }
      });
  }
}

class Apple {
  xOrigin = 10 * sizeOfSquare;
  yOrigin = 6 * sizeOfSquare;

  constructor() {
    this.x = this.xOrigin;
    this.y = this.yOrigin;
  }
  draw() {
    fground.fillStyle = "red";
    fground.fillRect(this.x,this.y,sizeOfSquare,sizeOfSquare);
  }
  // returns true if snake "bit" apple
  bitApple(snake) {
    // if head of snake coords coincide with apple 
    if(snake.coords[0].x === apple.x && snake.coords[0].y === apple.y) {
      console.log("SNAKE BIT APPLE");
      return true;
    }
    return false;
  }
  newApple(snake) {
    // no need to call clearRect() on apple, snake already clears apple
    let newX, newY;
    let isTouchingSnake; 
    // keep rolling if new X & Y are equal to snake position
    do {
      newX = Math.floor(Math.random() * (gameCanvas.width / sizeOfSquare)) * sizeOfSquare;
      newY = Math.floor(Math.random() * (gameCanvas.height / sizeOfSquare)) * sizeOfSquare;
      isTouchingSnake = snake.coords.some((seg) => seg.x === newX && seg.y === newY);
    } while(isTouchingSnake);
    this.x = newX;
    this.y = newY;
    this.draw();
    console.log("NEW APPLE GENERATED");

  }
}


const snake = new Snake(); 
const apple = new Apple();
apple.draw();
snake.draw();

let inputProcessed; 
let lastTime = 0;
let moveInterval = 100; // 500ms = 0.5 sec
function animate(timestamp) {
  requestAnimationFrame(animate); 
  // Always clear snake+apple at the start of every frame
  fground.clearRect(0,0,gameCanvas.width,gameCanvas.height);
  // conditions to end game: out of bounds or overlap
  if(snake.outOfBounds()  || snake.isOverlap()) {
    console.log("GAME OVER!");
    snake.reset(apple);
    return; // exit the frame immediately
  }
  const deltaTime = timestamp - lastTime;
  // only update if 
  if(deltaTime >= moveInterval) {
    const ateApple = apple.bitApple(snake);
    if(ateApple) {
      apple.newApple(snake);
    }
    snake.update(ateApple);
    lastTime = timestamp;
    inputProcessed = false; // reset state of inputProcessed 
  }
  apple.draw();
  snake.draw();
}
animate(0); // pass an initial 0 to start the clock

// if last keystroke is the same, no change needed
let lastKeyDown;
// captures users keystroke inputs

document.addEventListener("keydown", (event) => {
  if(inputProcessed) {
    return; // if we already captured input for this frame, don't capture another input
  }
  if((event.key == "w" || event.key == "ArrowUp") &&  lastKeyDown !== event.key) {
    // snake cannot turn into itself 
    if(lastKeyDown !=="s" && lastKeyDown !=="ArrowDown") {
      snake.updateDirection(0,-sizeOfSquare); 
      lastKeyDown = event.key; // update lastKeyDown 
      inputProcessed = true; 
    }
  }
  if((event.key == "a" || event.key == "ArrowLeft") && lastKeyDown !== event.key) {
    if(lastKeyDown !== "d" && lastKeyDown !== "ArrowRight") {
      snake.updateDirection(-sizeOfSquare,0);
      lastKeyDown = event.key;
      inputProcessed = true;
    }
  }
  if((event.key == "s" || event.key == "ArrowDown") && lastKeyDown !== event.key) {
    if(lastKeyDown !== "w" && lastKeyDown !== "ArrowUp") {
      snake.updateDirection(0,sizeOfSquare);
      lastKeyDown = event.key;
      inputProcessed = true;
    }    
  }
  if((event.key == "d" || event.key == "ArrowRight") && lastKeyDown !== event.key) {
    if(lastKeyDown !== "a" && lastKeyDown !== "ArrowLeft") {
      snake.updateDirection(sizeOfSquare,0);
      lastKeyDown = event.key;
      inputProcessed = true;
    }
  }
});
