# Project 3: Simon Says Game - Requirements

## Game Components

### 1. Game Board
**HTML Structure:**
- 4 colored button pads (red, green, blue, yellow)
- Start button
- Reset button
- Difficulty selector (dropdown or buttons)
- Score display
- Level display
- High score display
- Instructions/status message area

**CSS Styling:**
- Square or circular buttons with distinct colors
- Hover effects
- Active/pressed state
- Disabled state (during playback)
- Responsive layout (works on mobile)

---

## Game Logic

### State Management
```javascript
const gameState = {
  sequence: [],           // Computer's sequence
  playerSequence: [],     // Player's current input
  level: 1,               // Current level
  score: 0,               // Current score
  highScore: 0,           // Best score (from localStorage)
  isPlaying: false,       // Game active
  isPlayingSequence: false, // Computer playing
  difficulty: 'normal'    // easy, normal, hard
};
```

### Game States
1. **IDLE** - Waiting for start
2. **PLAYING_SEQUENCE** - Computer playing sequence
3. **PLAYER_TURN** - Player entering sequence
4. **GAME_OVER** - Game ended

### Sequence Generation
- Generate random number 0-3 (representing 4 colors)
- Add to sequence array
- Sequence starts with 1 step, adds 1 per level

### Sequence Playback
- Loop through sequence array
- For each step:
  - Highlight button (add CSS class)
  - Play sound
  - Wait (duration based on difficulty)
  - Unhighlight button
  - Wait (gap between steps)
- After sequence: enable player input

### Player Input
- Capture button clicks
- Ignore clicks during playback
- Add color to playerSequence
- After each click:
  - Check if correct so far
  - If wrong: game over
  - If complete sequence correct: next level
- Provide immediate feedback (sound, animation)

### Scoring
- Points per correct sequence
- Bonus for higher levels
- Bonus for harder difficulty
- Save high score to localStorage

---

## Technical Requirements

### Audio
**Sound Files:**
- `sound-red.mp3` (or .wav, .ogg)
- `sound-green.mp3`
- `sound-blue.mp3`
- `sound-yellow.mp3`
- `sound-error.mp3` (game over)

**Implementation:**
```javascript
const sounds = {
  red: new Audio('sounds/sound-red.mp3'),
  green: new Audio('sounds/sound-green.mp3'),
  blue: new Audio('sounds/sound-blue.mp3'),
  yellow: new Audio('sounds/sound-yellow.mp3'),
  error: new Audio('sounds/sound-error.mp3')
};

function playSound(color) {
  sounds[color].currentTime = 0; // Reset to start
  sounds[color].play();
}
```

### Animations
**Button Highlight:**
```css
.game-button {
  transition: all 0.1s ease;
}

.game-button.active {
  transform: scale(0.95);
  opacity: 1;
  filter: brightness(1.5);
}
```

**Flash Effects:**
- Success: brief green flash
- Error: red flash + shake animation

### Async Handling
**Delay Function:**
```javascript
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Usage
async function playSequence() {
  for (const color of sequence) {
    await highlightButton(color);
    await delay(600);
  }
}
```

### Difficulty Settings
```javascript
const DIFFICULTY = {
  easy: { speed: 1000, gap: 400 },
  normal: { speed: 600, gap: 200 },
  hard: { speed: 400, gap: 100 }
};
```

---

## User Experience Requirements

### Visual Feedback
- [ ] Buttons pulse or glow when active
- [ ] Clear indication of game state (playing, your turn, game over)
- [ ] Smooth transitions between states
- [ ] Loading indicator if needed

### Audio Feedback
- [ ] Each button has distinct sound
- [ ] Sounds play without lag
- [ ] Error sound is clearly different
- [ ] Option to mute sounds

### Responsive Design
- [ ] Works on desktop (1024px+)
- [ ] Works on tablet (768-1023px)
- [ ] Works on mobile (320-767px)
- [ ] Touch-friendly buttons (44x44px minimum)

### Accessibility
- [ ] Keyboard controls (1,2,3,4 or arrow keys)
- [ ] Focus states visible
- [ ] ARIA labels on buttons
- [ ] Screen reader friendly status messages
- [ ] High contrast mode friendly

---

## Functional Requirements

### Start Game
1. Click "Start" button
2. Load high score from localStorage
3. Reset score and level to initial values
4. Generate first sequence (1 step)
5. Play sequence
6. Enable player input

### Playing a Round
1. Computer plays sequence
2. Buttons disabled during playback
3. After playback, enable buttons
4. Player clicks buttons to repeat
5. Validate each click:
   - **Correct**: Continue
   - **Wrong**: Game over
   - **Complete**: Next level

### Next Level
1. Increment level
2. Update score
3. Add one random step to sequence
4. Play new sequence
5. Repeat

### Game Over
1. Play error sound
2. Show game over message
3. Display final score
4. Check if high score beaten
5. Save high score to localStorage
6. Enable reset button

### Reset Game
1. Clear sequence arrays
2. Reset score and level
3. Return to idle state
4. Enable start button

---

## Data Persistence

### localStorage
```javascript
// Save high score
localStorage.setItem('simonHighScore', highScore);

// Load high score
const savedHighScore = localStorage.getItem('simonHighScore');
if (savedHighScore) {
  highScore = parseInt(savedHighScore);
}
```

---

## Error Handling

- [ ] Handle missing audio files gracefully
- [ ] Prevent rapid clicking (debounce)
- [ ] Clear any active timers on reset
- [ ] Handle window focus/blur appropriately

---

## Performance Requirements

- [ ] No memory leaks (clean up event listeners and timers)
- [ ] Smooth animations (60fps)
- [ ] Fast button response (< 100ms)
- [ ] Efficient DOM updates

---

## Code Organization

### Recommended Structure:
```
project-3-browser-game/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── game.js      # Main game logic
│   ├── ui.js        # DOM manipulation
│   ├── audio.js     # Sound management
│   └── state.js     # State management
└── sounds/
    ├── sound-red.mp3
    ├── sound-green.mp3
    ├── sound-blue.mp3
    ├── sound-yellow.mp3
    └── sound-error.mp3
```

---

## Testing Checklist

Before considering complete:
- [ ] Game starts correctly
- [ ] Sequence plays with sounds
- [ ] Player input validated correctly
- [ ] Wrong input triggers game over
- [ ] Correct sequence advances level
- [ ] Score calculates correctly
- [ ] High score saves and loads
- [ ] Difficulty levels change speed
- [ ] Buttons disabled during playback
- [ ] Reset clears game state
- [ ] Works on mobile devices
- [ ] Keyboard controls work
- [ ] No console errors

---

## Stretch Goals

After completing core requirements:
1. **Multiple Lives** - 3 chances before game over
2. **Power-Ups** - Skip level, slow down, show next
3. **Themes** - Different color schemes
4. **Multiplayer** - Pass and play mode
5. **Achievements** - Unlock for milestones
6. **Leaderboard** - Top 10 scores
7. **Sound Packs** - Different instrument sounds
8. **Strict Mode** - No mistakes allowed

---

**Focus on getting the core game loop working first**, then add polish and features!
