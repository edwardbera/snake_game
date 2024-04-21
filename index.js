const GAME_BOARD = document.getElementById("myCanvas");
const CONTEXT = GAME_BOARD.getContext("2d");
const START_BUTTON = document.getElementById("startButton");
let velocity = 0;


let snake = {
    x : 20,
    y : 10
}

function drawSnake(){
    if (hasCollided(snake.x , snake.y)){
        snake.x = 10;
        endGame()
    }
    CONTEXT.fillRect(snake.x, 10, 50, 10);   
}

function update(){
    CONTEXT.clearRect(0,0, GAME_BOARD.width , GAME_BOARD.height )
    drawSnake();
    snake.x += velocity;
}

let hasCollided = (x, y) =>{
    if (x >= GAME_BOARD.width || x <= 0){
        return true
    }else if (y >= GAME_BOARD.height || y <= 0 ){
        return true
    }
}

function endGame(){
    CONTEXT.clearRect(0,0, GAME_BOARD.width , GAME_BOARD.height )
    velocity = 0;
    START_BUTTON.disabled = false;
}

function startGame(){
    CONTEXT.clearRect(0,0, GAME_BOARD.width , GAME_BOARD.height )
    velocity = 0.5;
}

START_BUTTON.addEventListener("click", function(){
    startGame();
    this.disabled = true;
})

function gameloop(){
    update();
    window.requestAnimationFrame(gameloop);
}

gameloop()