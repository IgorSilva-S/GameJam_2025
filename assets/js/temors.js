//CONFIGURAÇÕES
const WORD_LENGTH = 5;      
const MAX_GUESSES = 6;      

//Lista de todas as palavras que o programa pode escolhe
const TARGET_WORDS = [
    "APPLE", "TRAIN", "HOUSE", "PLANE", "CANDY", "SMILE", "FRESH"
]; 

//todas as palavras que podem ser escritas (por enquanto é isso pra ser facil tlgd)
const VALID_GUESSES = TARGET_WORDS; 
// jogo se pa
let currentGuess = "";
let currentRow = 0;
let gameOver = false;
let targetWord = TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
console.log("The secret word is: " + targetWord); //mostra a palavra

function createBoard() {
    const board = document.getElementById('Game-srceen');
    
    // Aquele bgl do css que tá em comentario
    board.style.gridTemplateColumns = `repeat(${WORD_LENGTH}, 1fr)`;

    for (let i = 0; i < MAX_GUESSES * WORD_LENGTH; i++) {
        let peca = document.createElement('div');
        peca.classList.add('peca');
        peca.setAttribute('id', `peca-${i}`);
        board.appendChild(peca);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createBoard();

    document.addEventListener("keyup", (e) => {
    if (gameOver) return;
    
    let key = e.key.toUpperCase();

    if (key === "ENTER") {
        checkGuess();
    } else if (key === "BACKSPACE") {
        deleteLetter();
    } else if (key.length === 1 && key.match(/[A-Z]/i)) {
        Escreveai(key);
    }
});

function Escreveai(letter) {
    if (currentGuess.length < WORD_LENGTH) {
        currentGuess += letter;
        let pecaIndex = currentRow * WORD_LENGTH + currentGuess.length - 1;
        document.getElementById(`peca-${pecaIndex}`).innerText = letter;
    }
}

function deleteLetter() {
    if (currentGuess.length > 0) {
        let pecaIndex = currentRow * WORD_LENGTH + currentGuess.length - 1;
        document.getElementById(`peca-${pecaIndex}`).innerText = "";
        currentGuess = currentGuess.slice(0, -1);
    }
}

function checkGuess() {
    if (currentGuess.length !== WORD_LENGTH) {
        document.getElementById('Message-area').innerText = `A palavra deve ter ${WORD_LENGTH} letras!`;
        return;
    }

    // testa se palavra existe
    if (!VALID_GUESSES.includes(currentGuess)) {
        document.getElementById('Message-area').innerText = "Palavra não existe";
        return;
    }

    // Limpa palavra
    document.getElementById('Message-area').innerText = "";

    let guess = currentGuess.split('');
    let solution = targetWord.split('');

    for (let i = 0; i < WORD_LENGTH; i++) {
        let pecaIndex = currentRow * WORD_LENGTH + i;
        let peca = document.getElementById(`peca-${pecaIndex}`);
        let letter = guess[i];

        if (solution[i] === letter) {
            peca.classList.add('certo');
            // Marca como correto para não marca como presente dps (eu ach)
            solution[i] = null;
        } else if (solution.includes(letter)) {
            peca.classList.add('tem');
        } else {
            peca.classList.add('nntem');
        }
    }

    // Ganha ou perde
    if (currentGuess === targetWord) {
        document.getElementById('Message-area').innerText = "Você Acertou!";
        gameOver = true;
    } else if (currentRow >= MAX_GUESSES - 1) {
        document.getElementById('Message-area').innerText = `Você perdeu, a palavra era ${targetWord}!`;
        gameOver = true;
    } else {
        //Proxima tentativa
        currentRow++;
        currentGuess = "";
    }
}
    
});