const GAME_BOARD = document.getElementById("myCanvas");
const CONTEXT = GAME_BOARD.getContext("2d");
const START_BUTTON = document.getElementById("startButton");
const SCORE_OUTPUT = document.getElementById("score");
let velocity = 0;
let score = 0;

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
    //drawTail();
    if (hasCollidedWithFood(snake.x  , snake.y )){
        food.x = Math.random() * 400;
        food.y = Math.random() * 300;
    } 
        generateFood();
    if (snake.direction == 'down'){
        snake.y += velocity;
        tails.forEach((tail)=>{
            tail.y += velocity;
        })
        //snakeTail.y += velocity;
    }else if(snake.direction == 'up'){
        snake.y -= velocity;
        tails.forEach((tail)=>{
            tail.y -= velocity;
        })
        //snakeTail.y -= velocity;
    }else if(snake.direction == 'right'){
        snake.x += velocity;
        tails.forEach((tail)=>{
            tail.x += velocity;
        })
        //snakeTail.x += velocity;
    }else if(snake.direction == 'left'){
        snake.x -= velocity;
        tails.forEach((tail)=>{
            tail.x -= velocity;
        })
        //snakeTail.x += velocity;
    }else{
        snake.x += velocity;
    }
   
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
        tail.x = snake.x + 10;
        tail.direction = snake.direction;
        tail.y = snake.y
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
                break;
            case "ArrowUp":
                snake.direction = 'up';
                break;
            case "ArrowLeft":
                snake.direction = 'left';
                break;
            case "ArrowRight":
                snake.direction = 'right';
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