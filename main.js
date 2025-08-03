const raquetaAltura = 80, raquetaAncho = 10;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const puntuacionJU = document.getElementById("puntuacion");
const puntuacionOR = document.getElementById("puntuacion2");

let puntuacion1 = 0;
let puntuacion2 = 0;

const player = {
    x: 0,
    y: canvas.height / 2 - raquetaAltura / 2,
    ancho: raquetaAncho,
    alto: raquetaAltura,
    color: "white",
    dy: 10,
    puntuacion:0
};

const computer = {
    x: canvas.width - raquetaAncho,
    y: canvas.height / 2 - raquetaAltura / 2,
    ancho: raquetaAncho,
    alto: raquetaAltura,
    color: "white",
    dy: 4,
    puntuacion:0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radio: 8,
    rapidez: 5,
    dx: 5,
    dy: 5,
    color: "white"
};

let upPressed = false;
let downPressed = false;

function dibujaRecta(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function dibujaCirculo(x, y, radio, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radio, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function dibujaRed() {
    for (let i = 0; i < canvas.height; i += 20) {
        dibujaRecta(canvas.width / 2 - 1, i, 2, 10, "gray");
    }
}

function draw() {
    dibujaRecta(0, 0, canvas.width, canvas.height, "black");
    dibujaRed();
    dibujaRecta(player.x, player.y, player.ancho, player.alto, player.color);
    dibujaRecta(computer.x, computer.y, computer.ancho, computer.alto, computer.color);
    dibujaCirculo(ball.x, ball.y, ball.radio, ball.color);
}

function actualizar() {
    if (upPressed) player.y -= player.dy;
    if (downPressed) player.y += player.dy;

    player.y = Math.max(0, Math.min(canvas.height - player.alto, player.y));

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radio > canvas.height || ball.y - ball.radio < 0) {
        ball.dy *= -1;
    }

    if (ball.y < computer.y + computer.alto / 2) {
        computer.y -= computer.dy;
    } else {
        computer.y += computer.dy;
    }
    computer.y = Math.max(0, Math.min(canvas.height - computer.alto, computer.y));

    if (collision(ball, player)) {
        ball.dx = -ball.dx;
    }
    if (collision(ball, computer)) {
        ball.dx = -ball.dx;
    }

    if (ball.x < 0) {
        puntuacion2++;
        puntuacionOR.textContent = puntuacion2;
        resetBall();
    } else if (ball.x > canvas.width) {
        puntuacion1++;
        puntuacionJU.textContent = puntuacion1;
        resetBall();
    }
}

function collision(b, p) {
    return (
        b.x - b.radio < p.x + p.ancho &&
        b.x + b.radio > p.x &&
        b.y - b.radio < p.y + p.alto &&
        b.y + b.radio > p.y
    );
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
    ball.dy *= -1;
}

document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") upPressed = true;
    if (e.key === "ArrowDown") downPressed = true;
});

document.addEventListener("keyup", function (e) {
    if (e.key === "ArrowUp") upPressed = false;
    if (e.key === "ArrowDown") downPressed = false;
});

function game() {
    actualizar();
    draw();
}

setInterval(game, 1000 / 60);



