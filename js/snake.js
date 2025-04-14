const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }

    // Check for collisions
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
    }
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37: // Left
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 38: // Up
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 39: // Right
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
        case 40: // Down
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
    }
}

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

gameLoop();