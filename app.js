const canvas = document.getElementById("canvas");
document.body.style.height = "100vh";
canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;

const ctx = canvas.getContext("2d");

const particles = [];

function init() {
  for (let i = 0; i <= 300; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = Math.random() / 2;
    const speedY = Math.random() / 2;
    const dirX = Math.random() > 0.5 ? 1 : -1;
    const dirY = Math.random() > 0.5 ? 1 : -1;

    particles.push({
      x,
      y,
      speedX: speedX * dirX,
      speedY: speedY * dirY,
      neighbors: [],
    });
  }
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //draw particles
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x > canvas.width) p.x = 0;
    if (p.x < 0) p.x = canvas.width;
    if (p.y > canvas.height) p.y = 0;
    if (p.y < 0) p.y = canvas.height;

    setNeighbors(p, particles);
    for (let j = 0; j < p.neighbors.length; j++) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.neighbors[j].x, p.neighbors[j].y);
      ctx.lineWidth = Math.max(0, 1 - distance(p, p.neighbors[j]) / 75);
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.closePath();
    }
  }

  requestAnimationFrame(draw);
}

function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;

  return Math.sqrt(dx * dx + dy * dy);
}

function setNeighbors(p, particles) {
  p.neighbors = [];
  for (let i = 0; i < particles.length; i++) {
    const p2 = particles[i];
    if (p === p2) continue;
    if (distance(p, p2) < 75) {
      p.neighbors.push(p2);
    }
  }
}

init();
draw();
