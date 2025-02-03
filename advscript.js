let targetNumber;
let attempts = 0;
let guessPath = [];

function initGame() {
    targetNumber = Math.floor(Math.random() * 20) + 1;
    attempts = 0;
    guessPath = [];
    document.getElementById('message').textContent = '';
    document.getElementById('attempts').textContent = 'Tentativas: 0';
    document.getElementById('guess-path').textContent = '';
}

function checkGuess() {
    const guessInput = document.getElementById('guessInput');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');
    const guessPathDisplay = document.getElementById('guess-path');
    
    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > 20) {
        message.textContent = 'Por favor, insira um número válido entre 1 e 20.';
        return;
    }
    
    attempts++;
    attemptsDisplay.textContent = `Tentativas: ${attempts}`;
    
    // Add current guess to path
    guessPath.push(guess);
    
    if (guess === targetNumber) {
        message.textContent = `Parabéns! Você acertou o número ${targetNumber} em ${attempts} tentativas!`;
        
        // Display the full guess path
        guessPathDisplay.textContent = `Caminho: ${guessPath.join(' → ')}`;
        
        setTimeout(initGame, 3000);
    } else if (guess < targetNumber) {
        message.textContent = 'Tente um número maior.';
    } else {
        message.textContent = 'Tente um número menor.';
    }
    
    guessInput.value = '';
}

// Iniciar o jogo quando a página carregar
window.onload = initGame;