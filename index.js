const GAME_BOARD = document.getElementById("myCanvas");
const CONTEXT = GAME_BOARD.getContext("2d");
const START_BUTTON = document.getElementById("startButton");
let velocity = 0;


let snake = {
    x : 10,
    y : GAME_BOARD.height - 20,
    width : 10,
    height : 10,
    direction : 'right'
}

let food = {
    x : 10,
    y : 10,
    height : 5,
    width : 5,
}


function drawSnake(){
    if (hasCollided(snake.x + snake.width , snake.y + snake.height)){
        endGame()
    }
    CONTEXT.fillRect(snake.x, snake.y, snake.width, snake.height);   
}

function generateFood(){

    CONTEXT.fillRect(food.x, food.y, food.width, food.height);   
}

function update(){
    CONTEXT.clearRect(0,0, GAME_BOARD.width , GAME_BOARD.height )
    drawSnake();
    generateFood();
    if (snake.direction == 'down'){
        snake.y += velocity;
    }else if(snake.direction == 'up'){
        snake.y -= velocity;
    }else if(snake.direction == 'right'){
        snake.x += velocity;
    }else if(snake.direction == 'left'){
        snake.x -= velocity;
    }else{
        snake.x += velocity;
    }
   
}

let hasCollided = (x, y) =>{
    if (x >= GAME_BOARD.width || x <= 0){
        return true;
    }else if (y >= GAME_BOARD.height || y <= 0 ){
        return true;
    }

    if (x == food.x  && y == food.y ){
        return true;
    }
}

function endGame(){
    CONTEXT.clearRect(0,0, GAME_BOARD.width , GAME_BOARD.height )
    velocity = 0;
    snake.x = 10;
    snake.y = GAME_BOARD.height - 20;
    START_BUTTON.disabled = false;
}

function startGame(){
    food.x = Math.random() * 400;
    food.y = Math.random() * 300;
    CONTEXT.clearRect(0,0, GAME_BOARD.width , GAME_BOARD.height);
    velocity = 0.5;
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