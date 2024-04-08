// script.js
const words = ["JAVASCRIPT", "HTML", "CSS", "PYTHON", "JAVA", "PHP", "SQL", "GIT", "REACT", "ANGULAR"]; // Lista de palavras possíveis
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

function showNotification(message, type) {
    const notificationDiv = document.createElement("div");
    notificationDiv.classList.add("alert", `alert-${type}`, "mt-3");
    notificationDiv.setAttribute("role", "alert");
    notificationDiv.textContent = message;
    document.getElementById("hangman").appendChild(notificationDiv);
    setTimeout(function() {
        notificationDiv.remove();
    }, 3000);
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter)) {
        showNotification("Essa letra já foi adivinhada.", "warning");
        return;
    }

    guessedLetters.push(letter);

    if (!selectedWord.includes(letter)) {
        remainingAttempts--;
    }

    updateDisplay();

    if (checkWin()) {
        showNotification("Parabéns, você acertou: "  + selectedWord + " ✅", "success");
        init();
    } else if (checkLose()) {
        showNotification("Você perdeu. A palavra era: " + selectedWord + " ❌", "danger");
        init();
    }
}

init();

document.addEventListener("keydown", function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        handleGuess(event.key.toUpperCase());
    }
});
