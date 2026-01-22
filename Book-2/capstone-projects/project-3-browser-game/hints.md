# Simon Says Game - Hints & Tips

## Common Challenges & Solutions

### Challenge 1: Sequence Playback with Delays

**Problem:** How to play sequence with pauses between steps?

**Solution:** Use async/await with Promise-based delay
```javascript
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function playSequence() {
  gameState.isPlayingSequence = true;
  
  for (const color of gameState.sequence) {
    highlightButton(color);
    playSound(color);
    await delay(600);
    unhighlightButton(color);
    await delay(200);
  }
  
  gameState.isPlayingSequence = false;
  gameState.isPlayerTurn = true;
}
```

---

### Challenge 2: Preventing Clicks During Playback

**Problem:** Player can click buttons while computer is playing

**Solution:** Guard clause at start of click handler
```javascript
function handleButtonClick(color) {
  // Prevent clicks during playback or when not playing
  if (gameState.isPlayingSequence || !gameState.isPlaying) {
    return;
  }
  
  // Process click
  gameState.playerSequence.push(color);
  playSound(color);
  checkInput();
}
```

---

### Challenge 3: Sounds Not Playing or Overlapping

**Problem:** Sounds lag or play on top of each other

**Solution:** Reset audio before playing
```javascript
function playSound(color) {
  const sound = sounds[color];
  sound.currentTime = 0; // Reset to beginning
  sound.play().catch(err => console.log('Audio play failed:', err));
}
```

**Preload sounds:**
```javascript
// Load sounds when page loads
window.addEventListener('load', () => {
  Object.values(sounds).forEach(sound => {
    sound.load();
  });
});
```

---

### Challenge 4: State Management Gets Messy

**Problem:** Multiple flags (isPlaying, isPlayerTurn, etc.) conflict

**Solution:** Use explicit state machine
```javascript
const STATES = {
  IDLE: 'idle',
  SHOWING: 'showing',
  WAITING: 'waiting',
  GAMEOVER: 'gameover'
};

let currentState = STATES.IDLE;

function setState(newState) {
  currentState = newState;
  
  switch(newState) {
    case STATES.SHOWING:
      disableButtons();
      playSequence();
      break;
    case STATES.WAITING:
      enableButtons();
      break;
    case STATES.GAMEOVER:
      disableButtons();
      showGameOver();
      break;
  }
}
```

---

### Challenge 5: Button Animations Timing

**Problem:** Button stays highlighted or flickers

**Solution:** Use setTimeout to control highlight duration
```javascript
function highlightButton(color) {
  const button = document.querySelector(`[data-color="${color}"]`);
  button.classList.add('active');
  
  setTimeout(() => {
    button.classList.remove('active');
  }, 300);
}
```

---

### Challenge 6: High Score Not Persisting

**Problem:** High score resets on page refresh

**Solution:** Save to localStorage after each game
```javascript
function updateHighScore(score) {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('simonHighScore', highScore.toString());
    document.getElementById('high-score').textContent = highScore;
  }
}

// Load on page load
function loadHighScore() {
  const saved = localStorage.getItem('simonHighScore');
  return saved ? parseInt(saved) : 0;
}
```

---

## Code Patterns

### Random Color Generation
```javascript
const COLORS = ['red', 'green', 'blue', 'yellow'];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
}

function addToSequence() {
  const newColor = getRandomColor();
  gameState.sequence.push(newColor);
}
```

### Input Validation
```javascript
function checkInput() {
  const currentIndex = gameState.playerSequence.length - 1;
  const correctColor = gameState.sequence[currentIndex];
  const playerColor = gameState.playerSequence[currentIndex];
  
  if (playerColor !== correctColor) {
    gameOver();
    return;
  }
  
  // Check if sequence complete
  if (gameState.playerSequence.length === gameState.sequence.length) {
    levelComplete();
  }
}
```

### Score Calculation
```javascript
function calculateScore() {
  const basePoints = 10;
  const levelBonus = (gameState.level - 1) * 5;
  const difficultyMultiplier = {
    easy: 1,
    normal: 1.5,
    hard: 2
  };
  
  return (basePoints + levelBonus) * difficultyMultiplier[gameState.difficulty];
}
```

---

## Debugging Tips

### Console Logging State
```javascript
function logState() {
  console.log('State:', {
    sequence: gameState.sequence,
    playerSequence: gameState.playerSequence,
    level: gameState.level,
    isPlaying: gameState.isPlaying,
    isPlayingSequence: gameState.isPlayingSequence
  });
}

// Call after key actions
gameState.sequence.push(color);
logState();
```

### Visual State Indicator
```javascript
function updateStatusMessage(message) {
  document.getElementById('status').textContent = message;
}

// Use throughout game
updateStatusMessage('Watch the sequence...');
updateStatusMessage('Your turn!');
updateStatusMessage('Game Over! Score: ' + score);
```

---

## Performance Tips

### Debouncing Button Clicks
```javascript
let canClick = true;

function handleButtonClick(color) {
  if (!canClick) return;
  canClick = false;
  
  // Process click
  processClick(color);
  
  setTimeout(() => {
    canClick = true;
  }, 100);
}
```

### Cleaning Up Timers
```javascript
let activeTimeouts = [];

function safeSetTimeout(callback, delay) {
  const id = setTimeout(callback, delay);
  activeTimeouts.push(id);
  return id;
}

function clearAllTimeouts() {
  activeTimeouts.forEach(id => clearTimeout(id));
  activeTimeouts = [];
}

// Call on reset or game over
function resetGame() {
  clearAllTimeouts();
  // ... rest of reset logic
}
```

---

## Quick Reference

### Event Listeners Setup
```javascript
// Game buttons
document.querySelectorAll('.game-button').forEach(button => {
  button.addEventListener('click', (e) => {
    const color = e.target.dataset.color;
    handleButtonClick(color);
  });
});

// Control buttons
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('reset-btn').addEventListener('click', resetGame);

// Difficulty selector
document.getElementById('difficulty').addEventListener('change', (e) => {
  gameState.difficulty = e.target.value;
});
```

### Audio Setup
```javascript
const sounds = {
  red: new Audio('sounds/sound-red.mp3'),
  green: new Audio('sounds/sound-green.mp3'),
  blue: new Audio('sounds/sound-blue.mp3'),
  yellow: new Audio('sounds/sound-yellow.mp3'),
  error: new Audio('sounds/sound-error.mp3')
};

// Preload
window.addEventListener('load', () => {
  Object.values(sounds).forEach(s => s.load());
});
```

---

**Still stuck?** Break the problem down:
1. Can you generate a sequence?
2. Can you play it back (without delays first)?
3. Can you add delays?
4. Can you capture player input?
5. Can you validate input?

Solve each piece independently, then connect them!
