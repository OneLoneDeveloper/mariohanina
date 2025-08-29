import { typeAll } from './typewriter.js';

const canvas = document.getElementById("gameCanvas");
const ctx    = canvas.getContext("2d");

const baseCanvasSize           = 900;
const delayBeforeBallStarts    = 4500;
let scaleFactor = 1;

let centerX, centerY, radius,
    gravity   = 0.02,
    animationStarted = false;

// --- Ball & Paddle ---
const ball = {
  x : 0, y : 0,
  vx: Math.random() * 10 - 5,
  vy: Math.random() * 10 - 5,
  r : 10
};

const paddle = {
  angle        : 0,
  targetAngle  : 0,
  length       : 60,
  thickness    : 8,
  totalFrames  : 0,
  framesElapsed: 0,
  shortestDiff : 0
};

// === Helpers ===
const easeInOut = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const simulateFutureCollision = () => {
  let { x, y, vx, vy } = ball;
  for (let i = 0; i < 2000; i++) {
    x += vx; y += vy; vy += gravity;
    const dist = Math.hypot(x - centerX, y - centerY);
    if (dist + ball.r >= radius) return { angle: Math.atan2(y - centerY, x - centerX), time: i };
  }
  return { angle: paddle.angle, time: 0 };
};

const alignPaddleToPrediction = () => {
  const { angle, time } = simulateFutureCollision();
  paddle.angle = paddle.targetAngle = angle;
  paddle.totalFrames = time;
  paddle.framesElapsed = paddle.shortestDiff = 0;
};

// === Physics Step ===
function update() {
  ball.vy += gravity;
  ball.x  += ball.vx;
  ball.y  += ball.vy;

  const dx = ball.x - centerX,
        dy = ball.y - centerY,
        dist = Math.hypot(dx, dy);

  // Collision with bowl wall
  if (dist + ball.r >= radius) {
    const nx = dx / dist, ny = dy / dist;
    // Project ball back to rim
    ball.x = centerX + nx * (radius - ball.r);
    ball.y = centerY + ny * (radius - ball.r);
    // Reflect velocity
    const dot = ball.vx * nx + ball.vy * ny;
    ball.vx -= 2 * dot * nx;
    ball.vy -= 2 * dot * ny;

    // Aim paddle for next collision
    const { angle, time } = simulateFutureCollision();
    paddle.targetAngle  = angle;
    paddle.totalFrames  = Math.min(time, 240);
    paddle.framesElapsed = 0;

    const rawDiff = paddle.targetAngle - paddle.angle,
          shortest = ((rawDiff + Math.PI * 3) % (Math.PI * 2)) - Math.PI;

    if (Math.abs(shortest) < 0.01 || paddle.totalFrames <= 5) {
      paddle.angle = paddle.targetAngle;
      paddle.totalFrames = paddle.shortestDiff = 0;
    } else {
      paddle.shortestDiff = shortest;
    }
  }

  // Paddle easing
  if (paddle.framesElapsed < paddle.totalFrames) {
    const t  = paddle.framesElapsed / paddle.totalFrames,
          dt = easeInOut(t) - easeInOut((paddle.framesElapsed - 1) / paddle.totalFrames || 0);
    paddle.angle += dt * paddle.shortestDiff;
    paddle.framesElapsed++;
  } else {
    paddle.angle = paddle.targetAngle;
  }
}

// === Render ===
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle  = "#f91dc6";
  ctx.font       = `${fontSize}px monospace`;
  ctx.textAlign  = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("o", ball.x, ball.y + 2);

  // Paddle
  const px = centerX + Math.cos(paddle.angle) * radius,
        py = centerY + Math.sin(paddle.angle) * radius,
        half = paddle.length / 2,
        perp = paddle.angle + Math.PI / 2;

  ctx.beginPath();
  ctx.moveTo(px + Math.cos(perp) * half, py + Math.sin(perp) * half);
  ctx.lineTo(px - Math.cos(perp) * half, py - Math.sin(perp) * half);
  ctx.strokeStyle = "#f91dc6";
  ctx.lineWidth   = paddle.thickness;
  ctx.stroke();
}

// === Responsive Canvas ===
function handleResize() {
  const w = window.innerWidth, h = window.innerHeight;
  let size = 400;
  if      (w >= 1600) size = 900;
  else if (w >= 1200) size = 800;
  else if (w >=  900) size = 700;
  else if (w >=  700) size = 600;
  else if (w >=  500) size = 500;

  size = Math.min(size, w, h);
  canvas.width = canvas.height = size;

  scaleFactor  = size / baseCanvasSize;
  centerX = centerY = size / 2;
  radius  = size * 0.45; 
  
  ball.r         = 10 * scaleFactor;
  ball.vx       *= scaleFactor;
  ball.vy       *= scaleFactor;
  paddle.length  = 60 * scaleFactor;
  paddle.thickness = 8 * scaleFactor;
  gravity       *= scaleFactor;
}

// === Main Loop ===
function loop() {
  if (animationStarted) update();
  draw();
  requestAnimationFrame(loop);
}

const mainCharO = document.querySelector("#o-in-mario");
mainCharO.setAttribute("data-char", "o");

// --- Intro Sequence ---
async function startSequence() {
  await typeAll();
  mainCharO.classList.add("blink");

  // Wait for blink to finish (500ms)
  await new Promise(res => setTimeout(res, 2000));

  // Clean up
  mainCharO.classList.remove("blink"); 
  mainCharO.classList.add("invisible"); 

  const rect = mainCharO.getBoundingClientRect(),
        canv = canvas.getBoundingClientRect();
        console.log(rect);
        
  ball.x = rect.left + rect.width  / 2 - canv.left;
  ball.y = rect.top  + rect.height / 2 - canv.top;

  alignPaddleToPrediction();

  
  setTimeout(() => {
    canvas.classList.add("visible");
    animationStarted = true;
   }, delayBeforeBallStarts);
}

const fontSize = parseFloat(getComputedStyle(document.querySelector("h1")).fontSize);
handleResize();
ball.x = centerX;
ball.y = centerY - radius / 2;
alignPaddleToPrediction();

startSequence();
loop();
