const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Posisi mouse
let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

// Kepala ular
let snake = [];
let snakeLength = 20;

// Inisialisasi badan ular
for (let i = 0; i < snakeLength; i++) {
  snake.push({ x: mouse.x, y: mouse.y });
}

// Deteksi gerakan mouse
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Update snake
function updateSnake() {
  let head = snake[0];

  // Kecepatan gerak kepala
  let dx = mouse.x - head.x;
  let dy = mouse.y - head.y;

  head.x += dx * 0.1;
  head.y += dy * 0.1;

  // Badan mengikuti kepala
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
}

// Gambar snake
function drawSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = snake.length - 1; i >= 0; i--) {
    ctx.beginPath();
    ctx.arc(snake[i].x, snake[i].y, 10 - i * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${i * 15}, 100%, 50%)`;
    ctx.fill();
  }
}

// Loop animasi
function animate() {
  updateSnake();
  drawSnake();
  requestAnimationFrame(animate);
}

animate();
