const GAME_BOARD = document.getElementById("myCanvas");
const CONTEXT = GAME_BOARD.getContext("2d");
const START_BUTTON = document.getElementById("startButton");
const SCORE_OUTPUT = document.getElementById("score");
let velocity = 0;
let score = 0;
let turningPoint = 0;
SCORE_OUTPUT.innerText = score;


let snake = {
    x : 10,
    y : GAME_BOARD.height - 20,
    width : 10,
    height : 10,
    direction : 'right'
}

let snakeTail = {
    x : 10,
    y : 10,
    width : 10,
    height : 10,
    direction : 'right'
}

let food = {
    x : 10,
    y : 10,
    height : 10,
    width : 10,
}

let tails = [];

function drawSnake(){
    if (hasCollidedWithWalls(snake.x + snake.width , snake.y + snake.height)){
        endGame()
    }
    CONTEXT.fillRect(snake.x, snake.y, snake.width, snake.height);   
}

function drawTail(){

    tails.forEach((tail)=>{
        CONTEXT.fillRect(tail.x, tail.y, tail.width, tail.height)
    })

}

function generateFood(){
    CONTEXT.fillRect(food.x, food.y, food.width, food.height);   
}

function update(){
    CONTEXT.clearRect(0,0, GAME_BOARD.width , GAME_BOARD.height )
    drawSnake();
    drawTail();
    if (hasCollidedWithFood(snake.x  , snake.y )){
        food.x = Math.random() * 400;
        food.y = Math.random() * 300;
    } 
        generateFood();
        snakeMovement();
        tailMovement();
    
}

let snakeMovement = () =>{
        
    if (snake.direction == 'down'){
        snake.y += velocity; 
        //snakeTail.y += velocity;
    }else if(snake.direction == 'up'){
        
        snake.y -= velocity; 
    }else if(snake.direction == 'right'){
        snake.x += velocity;
        
        //snakeTail.x += velocity;
    }else if(snake.direction == 'left'){
        snake.x -= velocity;
        
        //snakeTail.x += velocity;
    }else{
        snake.x += velocity;
    }
   
}
function tailMovement(){
  
    tails.forEach((tail)=>{
        if ( tail.direction == "right" && turningPoint != tail.x || tail.direction == "right" && turningPoint == 0){
            tail.x += velocity;
        }else if (tail.direction =="left" && turningPoint != tail.x || tail.direction =="left" && turningPoint == 0){
            tail.x -= velocity;
          
        }else if ( tail.direction == "right" || tail.direction == "left"  && turningPoint == tail.x ){
            if (snake.direction == "up"){
                tail.direction = "up"
                tail.y -= velocity;
                turningPoint = 0
            }else if (snake.direction == "down"){
                tail.direction = "down"
                tail.y += velocity;
                turningPoint = 0
            }  
        }else if ( tail.direction == "down" && turningPoint != tail.y || tail.direction == "down" && turningPoint == 0 ){
            tail.y += velocity;
            
        }else if ( tail.direction == "up" && turningPoint != tail.y || tail.direction == "up" && turningPoint == 0 ){
            tail.y -= velocity;
            
        }else if ( tail.direction == "down" || tail.direction == "up"  && turningPoint == tail.y ){

            if (snake.direction == "right"){
                tail.direction = "right"
                tail.x += velocity;
                turningPoint = 0
            }else if (snake.direction == "left"){
                tail.direction = "left"
                tail.x -= velocity;
                turningPoint = 0
            }  
            }

    })
}

let hasCollidedWithWalls = (x, y) =>{
   if (x >= GAME_BOARD.width || x <= 0){
        return true;
    }else if (y >= GAME_BOARD.height || y <= 0 ){
        return true;
    } 
}

let hasCollidedWithFood = (x, y) =>{
     if (
         (x + 5 ) > food.x  && (x-5) < food.x + food.width &&
         (y + 5) > food.y  && (y -5 )< food.y + food.height
     ){
        let tail = Object.create(snakeTail);
        if (tails.length == 0 && snake.direction == "right"){
            tail.x = snake.x - (snake.width * (tails.length + 1));
            tail.direction = snake.direction;
            tail.y = snake.y
        }else if (tails.length == 0 && snake.direction == "left"){ 
            tail.x = snake.x + (snake.width * (tails.length + 1));
            tail.direction = snake.direction;
            tail.y = snake.y
        }else if(tails.length > 0 && snake.direction == "right"){
            tail.x = snake.x - (snake.width * (tails.length + 1));
            tail.direction = snake.direction;
            tail.y = tails[tails.length-1].y
        }else if(tails.length > 0 && snake.direction == "left"){
            tail.x = snake.x + (snake.width * (tails.length + 1));
            tail.direction = snake.direction;
            tail.y = tails[tails.length-1].y
        }else if (tails.length == 0 && snake.direction == "up"){
            tail.y = snake.y + (snake.height * (tails.length + 1));
            tail.direction = snake.direction;
            tail.x = snake.x
        }else if (tails.length == 0 && snake.direction == "down"){ 
            tail.y = snake.y - (snake.height * (tails.length + 1));
            tail.direction = snake.direction;
            tail.x = snake.x
        }else if(tails.length > 0 && snake.direction == "up"){
            tail.y = snake.y + (snake.height * (tails.length + 1));
            tail.direction = snake.direction;
            tail.x = tails[tails.length-1].x
        }else if(tails.length > 0 && snake.direction == "down"){
            tail.y = snake.y - (snake.height * (tails.length + 1));
            tail.direction = snake.direction;
            tail.x = tails[tails.length-1].x
        }
        tails.push(tail)
        updateScore();
        //console.log(tails.length)
        return true;
     }
 }

function endGame(){
    CONTEXT.clearRect(0,0, GAME_BOARD.width , GAME_BOARD.height )
    velocity = 0;
    snake.x = 10;
    snake.y = GAME_BOARD.height - 20;
    START_BUTTON.disabled = false;
    score = 0;
    SCORE_OUTPUT.innerText = score;
}

function startGame(){
    food.x = Math.random() * 400;
    food.y = Math.random() * 300;
    CONTEXT.clearRect(0,0, GAME_BOARD.width , GAME_BOARD.height);
    velocity = 1;
    turningPoint = 0;
}

function updateScore(){
    score ++;
    SCORE_OUTPUT.innerText = score;
}

START_BUTTON.addEventListener("click", function(){
    startGame();
    this.disabled = true;
})

function controls(){
    document.addEventListener('keydown', function(event){
        switch (event.key){
            case "ArrowDown":
                snake.direction = 'down';
                turningPoint = snake.x;
                break;
            case "ArrowUp":
                snake.direction = 'up';
              
                turningPoint = snake.x;
                break;
            case "ArrowLeft":
                snake.direction = 'left';
              
                turningPoint= snake.y;
                break;
            case "ArrowRight":
                snake.direction = 'right';
               
                turningPoint = snake.y;
                break;
            default:
                return;
        }
    });
}

function gameLoop(){
    
    controls()
    update();
    window.requestAnimationFrame(gameLoop);
}

gameLoop();