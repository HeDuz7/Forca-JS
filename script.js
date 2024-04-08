// script.js
const words = ["JAVASCRIPT", "HTML", "CSS", "PYTHON", "JAVA"]; // Lista de palavras possíveis
let selectedWord = ""; // Palavra selecionada
let guessedLetters = []; // Letras já adivinhadas
let remainingAttempts = 6; // Número de tentativas restantes

function selectWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
}

function init() {
    selectWord();
    guessedLetters = [];
    remainingAttempts = 6;
    updateDisplay();
}

function updateDisplay() {
    let wordDisplay = "";
    for (let letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            wordDisplay += letter + " ";
        } else {
            wordDisplay += "_ ";
        }
    }
    document.getElementById("word").textContent = wordDisplay;

    document.getElementById("guessed-letters").textContent = "Letras já adivinhadas: " + guessedLetters.join(", ");

    document.getElementById("remaining-attempts").textContent = "Tentativas restantes: " + remainingAttempts;
}

function checkWin() {
    for (let letter of selectedWord) {
        if (!guessedLetters.includes(letter)) {
            return false;
        }
    }
    return true;
}

function checkLose() {
    return remainingAttempts <= 0;
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter)) {
        alert("Essa letra já foi adivinhada.");
        return;
    }

    // Adicionar a letra à lista de letras adivinhadas
    guessedLetters.push(letter);

    // Verificar se a letra está na palavra
    if (!selectedWord.includes(letter)) {
        remainingAttempts--;
    }

    // Atualizar a exibição
    updateDisplay();

    // Verificar se o jogo acabou
    if (checkWin()) {
        alert("Parabéns, você ganhou!");
        init();
    } else if (checkLose()) {
        alert("Você perdeu. A palavra era: " + selectedWord);
        init();
    }
}

init();

document.addEventListener("keydown", function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        handleGuess(event.key.toUpperCase());
    }
});
