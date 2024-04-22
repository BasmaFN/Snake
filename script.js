const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext("2d");
const box = 20;  // Size of each snake segment
const canvasSize = 400;
const snake = [{x: 200, y: 200}]; // initial snake position
const apple = {x: 0, y: 0};
let dx = 0; // Horizontal velocity
let dy = 0; // Vertical velocity
let score = 0;

function generateApple() {
    apple.x = Math.floor(Math.random() * (canvasSize / box)) * box;
    apple.y = Math.floor(Math.random() * (canvasSize / box)) * box;
}
generateApple();

function drawSegment(segment) {
    ctx.fillStyle = 'green';
    ctx.fillRect(segment.x, segment.y, box, box);
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(segment.x, segment.y, box, box);
}

function drawSnake() {
    snake.forEach(drawSegment);
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, box, box);
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 0, 20);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
}


function main() {
    clearCanvas();
    drawSnake();
    drawApple();
    drawScore();
    

    // Move the snake
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // Check for collision with apple
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        generateApple();
    } else {
        snake.pop();
    }

    // Check for collision with walls
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver();
        return;
    }

    // Check for collision with itself
    if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    // Repeat
    setTimeout(main, 100);
}

// Handle game over
function gameOver() {
    alert('Game Over! Your score: ' + score);
    location.reload(); // Reload the page to restart the game
}

// Handle key press events
document.addEventListener('keydown', function(event) {
    const key = event.keyCode;
    if (key === 37 && dx === 0) { // left arrow
        dx = -box;
        dy = 0;
    } else if (key === 38 && dy === 0) { // up arrow
        dx = 0;
        dy = -box;
    } else if (key === 39 && dx === 0) { // right arrow
        dx = box;
        dy = 0;
    } else if (key === 40 && dy === 0) { // down arrow
        dx = 0;
        dy = box;
    }
});

// Start the game
main();