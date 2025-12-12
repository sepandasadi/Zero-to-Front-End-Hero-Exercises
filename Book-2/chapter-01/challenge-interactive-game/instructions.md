# Challenge: Interactive Number Guessing Game

## 🎯 Objective

Build a complete interactive number guessing game that combines **everything** you've learned: variables, conditionals, loops, DOM manipulation, and event handling. This is your capstone project for JavaScript fundamentals!

## 🎮 What You're Building

A fully-functional guessing game where:
- The computer picks a random number (1-100)
- Player tries to guess the number
- Game provides feedback (too high, too low)
- Tracks number of attempts
- Shows game history and statistics
- Has difficulty levels
- Includes a beautiful, professional UI

## 📋 Core Requirements

### Requirement 1: Game Setup

**Initialize the game:**
1. Generate a random number between 1 and 100
2. Set initial number of attempts to 0
3. Create an empty array for guess history
4. Display instructions to the player

**Technical details:**
```js
// Generate random number
const secretNumber = Math.floor(Math.random() * 100) + 1;

// Initialize game state
let attempts = 0;
let guessHistory = [];
let gameActive = true;
```

### Requirement 2: Player Input

**Handle user guesses:**
1. Get input from a text field
2. Validate the input:
   - Must be a number
   - Must be between 1 and 100
   - Show error message for invalid input
3. Add valid guesses to history
4. Clear input after each guess

**Validation example:**
```js
if (isNaN(guess)) {
  showError("Please enter a number");
  return;
}

if (guess < 1 || guess > 100) {
  showError("Number must be between 1 and 100");
  return;
}
```

### Requirement 3: Game Logic

**Process each guess:**
1. Compare guess to secret number
2. Increment attempt counter
3. Provide feedback:
   - "Too high!" if guess > secret
   - "Too low!" if guess < secret
   - "Correct! You won!" if guess === secret
4. Add guess to history
5. Update all displays

### Requirement 4: Visual Feedback

**Provide clear feedback:**
1. Show whether guess was too high or too low
2. Display number of attempts
3. Show all previous guesses
4. Change colors based on how close:
   - Red: Far away (difference > 20)
   - Orange: Getting closer (difference 11-20)
   - Yellow: Close (difference 6-10)
   - Green: Very close (difference 1-5)
5. Celebrate when player wins

### Requirement 5: Game History

**Track the game:**
1. Display all previous guesses in order
2. Show which guesses were too high/too low
3. Calculate and show statistics:
   - Total guesses
   - Best guess (closest to answer)
   - Average guess value

### Requirement 6: New Game

**Allow replay:**
1. "New Game" button that:
   - Generates a new random number
   - Resets attempts to 0
   - Clears guess history
   - Clears feedback messages
   - Enables input field
   - Focuses on input field

## 🎨 Enhanced Features

### Feature 1: Difficulty Levels

Add three difficulty levels:

**Easy Mode:**
- Range: 1-50
- Unlimited attempts
- Shows "hot/cold" hints

**Medium Mode (Default):**
- Range: 1-100
- Unlimited attempts
- Shows high/low hints

**Hard Mode:**
- Range: 1-500
- Limited to 10 attempts
- Only shows high/low
- Game over if attempts run out

### Feature 2: Hint System

Provide optional hints:
1. "Is it even or odd?"
2. "Is it divisible by 5?"
3. "What range is it in?" (show quartile)
4. Limit hints (maybe 2 per game)
5. Show hint count remaining

### Feature 3: High Score System

Track best performances:
1. Save lowest number of attempts
2. Display on page
3. Use localStorage to persist
4. Show "New Record!" message when beaten
5. Display all-time stats

### Feature 4: Timer

Add time tracking:
1. Start timer when game begins
2. Show elapsed time
3. Stop timer when game ends
4. Track fastest completion time
5. Display time in mm:ss format

### Feature 5: Sound Effects (Optional)

Add audio feedback:
- Beep for wrong guess
- Success sound for correct guess
- Different tones for hot/cold
- Background music (with mute option)

## ✅ Success Criteria

Your game should:

1. ✅ Work correctly (proper game logic)
2. ✅ Validate all user input
3. ✅ Provide clear, helpful feedback
4. ✅ Track attempts and history
5. ✅ Allow replay without refresh
6. ✅ Have an attractive, professional UI
7. ✅ Be responsive (mobile-friendly)
8. ✅ Handle edge cases gracefully
9. ✅ Include at least 2 enhanced features
10. ✅ Have no console errors

## 💡 Implementation Hints

### Hint 1: Game State Management

Keep all game state in one place:
```js
const gameState = {
  secretNumber: 0,
  attempts: 0,
  guesses: [],
  isActive: true,
  startTime: null,
  difficulty: 'medium'
};
```

### Hint 2: Feedback Messages

Create a function to show messages:
```js
function showFeedback(message, type) {
  const feedback = document.getElementById('feedback');
  feedback.textContent = message;
  feedback.className = `feedback ${type}`; // success, error, warning
}
```

### Hint 3: Temperature Gauge

Calculate how close the guess is:
```js
function getCloseness(guess, secret) {
  const difference = Math.abs(guess - secret);
  if (difference <= 5) return 'hot';
  if (difference <= 10) return 'warm';
  if (difference <= 20) return 'cool';
  return 'cold';
}
```

### Hint 4: Guess History Display

Show previous guesses:
```js
function updateHistory() {
  const historyList = document.getElementById('history');
  historyList.innerHTML = '';

  guesses.forEach((guess, index) => {
    const item = document.createElement('li');
    item.textContent = `#${index + 1}: ${guess}`;
    historyList.appendChild(item);
  });
}
```

### Hint 5: Timer Implementation

Track elapsed time:
```js
let startTime;
let timerInterval;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  timerDisplay.textContent =
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}
```

## 🧪 Testing Checklist

Test these scenarios:

### Basic Functionality
- [ ] Game generates a random number
- [ ] Input accepts valid numbers
- [ ] Feedback is correct (high/low)
- [ ] Player can win the game
- [ ] Attempts are counted correctly
- [ ] New game button works

### Input Validation
- [ ] Empty input shows error
- [ ] Non-numbers show error
- [ ] Numbers out of range show error
- [ ] Decimal numbers are handled
- [ ] Duplicate guesses are allowed

### Edge Cases
- [ ] Guess on first try (attempt = 1)
- [ ] Guess the number 1
- [ ] Guess the number 100 (or max)
- [ ] Play multiple games in a row
- [ ] Rapid clicking doesn't break it

### UI/UX
- [ ] All elements display correctly
- [ ] Colors change appropriately
- [ ] History updates properly
- [ ] Mobile/desktop responsive
- [ ] Buttons have hover effects
- [ ] No console errors

## 🎨 Design Inspiration

**Color scheme ideas:**
```css
/* Success/Win */
background: linear-gradient(135deg, #10b981, #059669);

/* Too High */
background: linear-gradient(135deg, #ef4444, #dc2626);

/* Too Low */
background: linear-gradient(135deg, #3b82f6, #2563eb);

/* Neutral */
background: linear-gradient(135deg, #6b7280, #4b5563);
```

**Animation ideas:**
- Shake input field on error
- Pulse feedback message
- Confetti on win
- Smooth transitions
- Fade in guess history items

## ⏱️ Estimated Time

**1-2 hours for complete implementation**

- 20 minutes: Basic game logic
- 20 minutes: Input validation and feedback
- 15 minutes: Guess history
- 20 minutes: Styling and UI
- 15 minutes: New game functionality
- 30 minutes: Enhanced features
- 20 minutes: Testing and polish

## 🎯 Bonus Challenges

### Bonus 1: Multiplayer Mode

Two players take turns:
- Player 1 sets the number
- Player 2 tries to guess
- Switch roles after each game
- Keep score

### Bonus 2: Achievements System

Award achievements:
- "Lucky Shot" - Win in 1 guess
- "Persistent" - Win after 20+ guesses
- "Speedster" - Win in under 30 seconds
- "Marathon" - Play 10 games
- Display achievement badges

### Bonus 3: Chart/Graph

Visualize guess distribution:
- Bar chart of guess proximity
- Line graph showing guess progression
- Use Canvas API or Chart.js

### Bonus 4: AI Opponent

Computer plays against itself:
- Implements binary search
- Shows AI thinking process
- Compare your performance to AI

### Bonus 5: Themes

Multiple visual themes:
- Dark mode
- Classic mode
- Neon mode
- Let user switch themes

## 📖 Resources

**JavaScript Concepts:**
- [MDN: Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- [MDN: Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

**Game Design:**
- Keep feedback immediate and clear
- Make success feel rewarding
- Don't punish failure
- Encourage replay

---

## 🎓 What This Teaches You

### Real-World Skills

This project teaches:

1. **State Management** - Tracking game data
2. **Event Handling** - User interactions
3. **Validation** - Protecting against bad input
4. **User Feedback** - Clear communication
5. **Data Persistence** - localStorage
6. **Problem Decomposition** - Breaking complex tasks into steps

### Professional Concepts

You're practicing:
- **MVC Pattern** - Separating logic and display
- **Error Handling** - Graceful failures
- **User Experience** - Intuitive design
- **Testing** - Systematic verification
- **Documentation** - Clear code comments

**This is the same process used to build professional applications!**

---

## 🚀 Next Steps

After completing this challenge:

1. **Deploy it** - Put it online (GitHub Pages, Netlify)
2. **Share it** - Get feedback from others
3. **Iterate** - Add more features
4. **Learn from it** - Review your code in a week
5. **Build more** - Apply these skills to new projects

---

## 💪 You Can Do This!

This challenge brings together everything you've learned. It might seem complex, but you have all the skills you need:

- ✅ You know variables → Track the secret number
- ✅ You know conditionals → Check if guess is right
- ✅ You know loops → Process multiple guesses
- ✅ You know DOM → Update the page
- ✅ You know events → Handle user input

**Build it step by step. Test frequently. Debug patiently.**

You're not just completing an exercise—you're building a real application that people can play and enjoy. That's **real web development**.

**Now go build your game!** 🎮✨

---

**Questions?** Break the project into smaller pieces. Start with the core game loop, then add features one at a time. You've got this!

