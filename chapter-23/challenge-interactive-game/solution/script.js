// Challenge: Interactive Number Guessing Game - SOLUTION
// Complete implementation with all features

// ========================================
// Select HTML Elements
// ========================================

const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const newGameBtn = document.getElementById('new-game-btn');
const hintBtn = document.getElementById('hint-btn');
const difficultySelect = document.getElementById('difficulty');

const feedbackDiv = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const bestScoreDisplay = document.getElementById('best-score');
const timerDisplay = document.getElementById('timer');
const guessHistoryDiv = document.getElementById('guess-history');
const hintCountDisplay = document.getElementById('hint-count');
const rangeDisplay = document.getElementById('range-display');

// ========================================
// Game State Variables
// ========================================

let secretNumber;
let attempts;
let guessHistory;
let gameActive;
let hintsRemaining;
let minNumber;
let maxNumber;
let maxAttempts;
let startTime;
let timerInterval;

// Load best score from localStorage
let bestScore = localStorage.getItem('bestScore') || null;
if (bestScore) {
  bestScoreDisplay.textContent = bestScore;
}

// ========================================
// Function: Start New Game
// ========================================

function startNewGame() {
  // Get difficulty settings
  const difficulty = difficultySelect.value;

  switch(difficulty) {
    case 'easy':
      minNumber = 1;
      maxNumber = 50;
      maxAttempts = Infinity;
      hintsRemaining = 3;
      break;
    case 'hard':
      minNumber = 1;
      maxNumber = 500;
      maxAttempts = 10;
      hintsRemaining = 1;
      break;
    default: // medium
      minNumber = 1;
      maxNumber = 100;
      maxAttempts = Infinity;
      hintsRemaining = 2;
  }

  // Generate secret number
  secretNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  console.log('🎯 Secret number:', secretNumber); // Debug only

  // Reset game state
  attempts = 0;
  guessHistory = [];
  gameActive = true;

  // Update displays
  attemptsDisplay.textContent = attempts;
  rangeDisplay.textContent = `${minNumber} and ${maxNumber}`;
  hintCountDisplay.textContent = hintsRemaining;
  guessHistoryDiv.innerHTML = '<p class="empty-message">No guesses yet...</p>';
  feedbackDiv.textContent = '';
  feedbackDiv.className = 'feedback';
  guessInput.value = '';
  guessInput.disabled = false;
  guessInput.min = minNumber;
  guessInput.max = maxNumber;
  submitBtn.disabled = false;
  hintBtn.disabled = false;

  // Start timer
  startTimer();

  // Focus input
  guessInput.focus();

  console.log('New game started!');
}

// ========================================
// Function: Process Guess
// ========================================

function processGuess() {
  if (!gameActive) return;

  const guess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(guess)) {
    showFeedback('Please enter a number', 'error');
    return;
  }

  if (guess < minNumber || guess > maxNumber) {
    showFeedback(`Number must be between ${minNumber} and ${maxNumber}`, 'error');
    return;
  }

  // Process valid guess
  attempts++;
  guessHistory.push(guess);
  attemptsDisplay.textContent = attempts;

  // Clear input
  guessInput.value = '';

  // Check guess
  if (guess === secretNumber) {
    // WIN!
    gameWon();
  } else {
    // Provide feedback
    const difference = Math.abs(guess - secretNumber);
    let feedback = '';
    let closeness = '';

    if (guess > secretNumber) {
      feedback = '📉 Too high!';
      closeness = getCloseness(difference);
    } else {
      feedback = '📈 Too low!';
      closeness = getCloseness(difference);
    }

    if (difference <= 10) {
      feedback += ` You're ${closeness}!`;
    }

    showFeedback(feedback, 'warning');

    // Update history
    updateHistory(guess, guess > secretNumber ? 'too-high' : 'too-low', closeness);

    // Check if out of attempts (hard mode)
    if (attempts >= maxAttempts) {
      gameLost();
    }
  }
}

// ========================================
// Function: Get Closeness
// ========================================

function getCloseness(difference) {
  if (difference <= 5) return 'hot';
  if (difference <= 10) return 'warm';
  if (difference <= 20) return 'cool';
  return 'cold';
}

// ========================================
// Function: Game Won
// ========================================

function gameWon() {
  gameActive = false;
  stopTimer();

  guessInput.disabled = true;
  submitBtn.disabled = true;
  hintBtn.disabled = true;

  const timeStr = timerDisplay.textContent;
  showFeedback(`🎉 Correct! You won in ${attempts} attempts! Time: ${timeStr}`, 'success');

  // Update best score
  if (!bestScore || attempts < parseInt(bestScore)) {
    bestScore = attempts;
    bestScoreDisplay.textContent = bestScore;
    localStorage.setItem('bestScore', bestScore);

    // Show new record message
    setTimeout(() => {
      showFeedback(`🎉 NEW RECORD! ${attempts} attempts in ${timeStr}! 🏆`, 'success');
    }, 2000);
  }

  // Add winning guess to history
  updateHistory(secretNumber, 'correct', 'hot');

  // Celebrate!
  celebrate();
}

// ========================================
// Function: Game Lost
// ========================================

function gameLost() {
  gameActive = false;
  stopTimer();

  guessInput.disabled = true;
  submitBtn.disabled = true;
  hintBtn.disabled = true;

  showFeedback(`😢 Game Over! The number was ${secretNumber}. Try again!`, 'error');
}

// ========================================
// Function: Update History Display
// ========================================

function updateHistory(guess, type, closeness) {
  // Remove empty message
  if (guessHistoryDiv.querySelector('.empty-message')) {
    guessHistoryDiv.innerHTML = '';
  }

  const guessItem = document.createElement('div');
  guessItem.className = `guess-item ${type} ${closeness}`;
  guessItem.textContent = guess;
  guessHistoryDiv.appendChild(guessItem);
}

// ========================================
// Function: Show Feedback
// ========================================

function showFeedback(message, type) {
  feedbackDiv.textContent = message;
  feedbackDiv.className = `feedback ${type}`;
}

// ========================================
// Function: Provide Hint
// ========================================

function provideHint() {
  if (hintsRemaining <= 0 || !gameActive) return;

  hintsRemaining--;
  hintCountDisplay.textContent = hintsRemaining;

  if (hintsRemaining === 0) {
    hintBtn.disabled = true;
  }

  // Generate hint
  let hint = '';
  const hintType = hintsRemaining % 3;

  switch(hintType) {
    case 0:
      hint = secretNumber % 2 === 0 ? 'The number is EVEN' : 'The number is ODD';
      break;
    case 1:
      hint = secretNumber % 5 === 0 ? 'The number is divisible by 5' : 'The number is NOT divisible by 5';
      break;
    case 2:
      const quarter = Math.ceil((maxNumber - minNumber) / 4);
      if (secretNumber <= minNumber + quarter) {
        hint = `The number is in the first quarter (${minNumber}-${minNumber + quarter})`;
      } else if (secretNumber <= minNumber + quarter * 2) {
        hint = `The number is in the second quarter (${minNumber + quarter + 1}-${minNumber + quarter * 2})`;
      } else if (secretNumber <= minNumber + quarter * 3) {
        hint = `The number is in the third quarter (${minNumber + quarter * 2 + 1}-${minNumber + quarter * 3})`;
      } else {
        hint = `The number is in the fourth quarter (${minNumber + quarter * 3 + 1}-${maxNumber})`;
      }
      break;
  }

  showFeedback(`💡 Hint: ${hint}`, 'info');
}

// ========================================
// Function: Timer
// ========================================

function startTimer() {
  startTime = Date.now();
  timerDisplay.textContent = '0:00';

  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// ========================================
// Function: Celebrate Win
// ========================================

function celebrate() {
  // Create confetti
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.background = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)];
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      confetti.style.animationDelay = (Math.random() * 0.5) + 's';
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }

  // Show win overlay
  const overlay = document.createElement('div');
  overlay.className = 'win-overlay';
  overlay.innerHTML = `
    <h2>🎉 YOU WON! 🎉</h2>
    <p>You guessed it in ${attempts} attempts!</p>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => overlay.remove(), 3000);
}

// ========================================
// Event Listeners
// ========================================

// Submit button
submitBtn.addEventListener('click', processGuess);

// Enter key in input
guessInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    processGuess();
  }
});

// New game button
newGameBtn.addEventListener('click', startNewGame);

// Hint button
hintBtn.addEventListener('click', provideHint);

// Difficulty change
difficultySelect.addEventListener('change', () => {
  if (attempts > 0) {
    const confirmed = confirm('Changing difficulty will start a new game. Continue?');
    if (confirmed) {
      startNewGame();
    }
  } else {
    startNewGame();
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'n' || e.key === 'N') {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      startNewGame();
    }
  } else if (e.key === 'h' || e.key === 'H') {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      provideHint();
    }
  }
});

// ========================================
// Initialize Game
// ========================================

startNewGame();

console.log('🎮 Game initialized!');
console.log('💡 Keyboard shortcuts:');
console.log('   - Ctrl/Cmd + N: New Game');
console.log('   - Ctrl/Cmd + H: Get Hint');

