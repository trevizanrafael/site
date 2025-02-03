const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
const placar = document.getElementById("placar");
const fimJogo = document.getElementById("fimJogo");
const playerSelectionModal = document.getElementById("player-selection");

let leftPaddleY = canvas.height / 2 - 40;
let rightPaddleY = canvas.height / 2 - 40;
const paddleSpeed = 5;
let upPressed = false, downPressed = false, wPressed = false, sPressed = false;
let scoreLeft = 0, scoreRight = 0;
let gameRunning = true;
let numPlayers = 2;

function startGame(players) {
    numPlayers = players;
    playerSelectionModal.style.display = "none";
    update();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "w") wPressed = true;
    if (event.key === "s") sPressed = true;
    if (event.key === "ArrowUp") upPressed = true;
    if (event.key === "ArrowDown") downPressed = true;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w") wPressed = false;
    if (event.key === "s") sPressed = false;
    if (event.key === "ArrowUp") upPressed = false;
    if (event.key === "ArrowDown") downPressed = false;
});

function movePaddles() {
    if (!gameRunning) return;
    if (wPressed && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
    if (sPressed && leftPaddleY < canvas.height - 80) leftPaddleY += paddleSpeed;
    if (numPlayers === 2) {
        if (upPressed && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
        if (downPressed && rightPaddleY < canvas.height - 80) rightPaddleY += paddleSpeed;
    } else {
        // Controle automático para o segundo jogador
        if (ballY < rightPaddleY + 40 && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
        if (ballY > rightPaddleY + 40 && rightPaddleY < canvas.height - 80) rightPaddleY += paddleSpeed;
    }
}

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4, ballSpeedY = 4;

function moveBall() {
    if (!gameRunning) return;
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY <= 0 || ballY >= canvas.height - 10) {
        ballSpeedY *= -1;
    }
    if (ballX <= 10 && ballY >= leftPaddleY && ballY <= leftPaddleY + 80) {
        ballSpeedX *= -1;
    }
    if (ballX >= canvas.width - 20 && ballY >= rightPaddleY && ballY <= rightPaddleY + 80) {
        ballSpeedX *= -1;
    }

    if (ballX < 0) {
        scoreRight++;
        animarTorcida('right');
        resetBall();
    }
    if (ballX > canvas.width) {
        scoreLeft++;
        animarTorcida('left');
        resetBall();
    }
    placar.textContent = `${scoreLeft} - ${scoreRight}`;
    if (scoreLeft === 10 || scoreRight === 10) finalizarJogo();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX *= -1;
}

function drawField() {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 70, 0, Math.PI * 2);
    ctx.stroke();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    ctx.fillStyle = "#9370DB";
    ctx.fillRect(0, leftPaddleY, 10, 80);
    ctx.fillStyle = "#6495ED";
    ctx.fillRect(canvas.width - 10, rightPaddleY, 10, 80);
    ctx.fillStyle = "#BA55D3";
    ctx.beginPath();
    ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    movePaddles();
    moveBall();
    draw();
    if (gameRunning) requestAnimationFrame(update);
}

function finalizarJogo() {
    gameRunning = false;
    fimJogo.style.display = "flex";
}

function reiniciarJogo() {
    scoreLeft = 0;
    scoreRight = 0;
    placar.textContent = "0 - 0";
    gameRunning = true;
    fimJogo.style.display = "none";
    playerSelectionModal.style.display = "flex";
}

function animarTorcida(side) {
    const torcidaSuperior = document.getElementById("torcidaSuperior");
    const torcidaInferior = document.getElementById("torcidaInferior");

    // Reseta todos os pontos para opacidade baixa
    const allPoints = [...torcidaSuperior.children, ...torcidaInferior.children];
    allPoints.forEach(point => {
        point.style.opacity = "0.3";
        point.style.transform = "scale(1)";
    });

    // Anima os pontos do lado que marcou o gol
    let pointsToAnimate;
    if (side === 'left') {
        pointsToAnimate = [...torcidaSuperior.children];
    } else {
        pointsToAnimate = [...torcidaInferior.children];
    }

    // Seleciona alguns pontos aleatórios para animar
    const numPointsToAnimate = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < numPointsToAnimate; i++) {
        const randomIndex = Math.floor(Math.random() * pointsToAnimate.length);
        const point = pointsToAnimate[randomIndex];
        point.style.opacity = "1";
        point.style.transform = "scale(1.3)";
    }
}

// Inicializa a torcida
function inicializarTorcida() {
    const torcidaSuperior = document.getElementById("torcidaSuperior");
    const torcidaInferior = document.getElementById("torcidaInferior");

    // Adiciona pontos na torcida superior
    for (let i = 0; i < 10; i++) {
        const ponto = document.createElement("div");
        ponto.className = "ponto";
        torcidaSuperior.appendChild(ponto);
    }

    // Adiciona pontos na torcida inferior
    for (let i = 0; i < 10; i++) {
        const ponto = document.createElement("div");
        ponto.className = "ponto";
        torcidaInferior.appendChild(ponto);
    }
}

// Inicializa a torcida quando o script carrega
inicializarTorcida();

// Mantém o modal de seleção de jogadores visível no início
playerSelectionModal.style.display = "flex";