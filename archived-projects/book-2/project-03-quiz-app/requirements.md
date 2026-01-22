# Quiz Application - Detailed Requirements

Build an interactive quiz application that tests JavaScript logic, timers, scoring, and state management.

---

## 🎯 Project Goal

Create a quiz application that demonstrates mastery of JavaScript logic, DOM manipulation, timers, data management, and user interaction.

---

## 📋 Core Features (MVP)

### 1. Quiz Setup Screen
**Required Elements:**
- Welcome message
- Quiz category selection (e.g., General Knowledge, Science, History)
- Difficulty selection (Easy, Medium, Hard)
- Number of questions selector (5, 10, 15, 20)
- Start Quiz button
- Instructions/rules display

**Options:**
- Timer enabled/disabled toggle
- Player name input (for high scores)

### 2. Quiz Question Display
**Requirements:**
- Display current question number (e.g., "Question 3 of 10")
- Progress bar showing completion
- Question text clearly visible
- Multiple choice answers (4 options: A, B, C, D)
- Visual feedback for selected answer
- Submit/Next button
- Timer display (if enabled)
- Score display (current points)

**Layout:**
- Clear visual hierarchy
- Large, readable text
- Color-coded options
- Responsive design

### 3. Answer Selection & Validation
**Functionality:**
- Click to select answer
- Visual highlight for selected option
- Submit answer
- Immediate feedback (correct/incorrect)
- Show correct answer if wrong
- Disable options after submission
- Prevent multiple submissions
- Points calculation

**Feedback:**
- ✅ Green for correct answer
- ❌ Red for incorrect answer
- Highlight correct answer
- Brief explanation (bonus)

### 4. Timer System
**Requirements:**
- Countdown timer per question (e.g., 30 seconds)
- Visual timer display (seconds remaining)
- Timer pause when answer submitted
- Auto-submit when timer reaches 0
- Timer warning (last 10 seconds)
- Optional overall quiz timer

**Visual Indicators:**
- Normal state (green/blue)
- Warning state (yellow) - last 10 seconds
- Critical state (red) - last 5 seconds
- Timer animation

### 5. Scoring System
**Requirements:**
- Points per correct answer
- Bonus points for speed (optional)
- Time-based scoring multiplier
- Running score display
- Final score calculation
- Percentage score

**Formula Examples:**
```
Basic: 10 points per correct answer
Time Bonus: +5 points if answered in < 10 seconds
Perfect Streak: +20 bonus for 5 correct in a row
```

### 6. Question Navigation
**Features:**
- Next question button
- Previous question (optional)
- Question skip (optional, penalty)
- Review flagged questions
- Jump to specific question (advanced)

**Progress Tracking:**
- Questions answered
- Questions remaining
- Current position

### 7. Results Screen
**Display:**
- Final score (points and percentage)
- Questions correct / total
- Time taken (total)
- Performance rating (Excellent, Good, Fair, Poor)
- Questions review (show all Q&A)
- Correct/Incorrect breakdown
- Share results button (bonus)

**Actions:**
- Retake quiz
- Try different difficulty
- View high scores
- Home button

### 8. High Scores (localStorage)
**Requirements:**
- Save top 10 scores
- Store: name, score, date, time, difficulty
- Display leaderboard
- Sort by score (descending)
- Filter by difficulty
- Clear scores option

**Data Structure:**
```javascript
{
  name: "Player",
  score: 85,
  percentage: 85,
  correct: 17,
  total: 20,
  difficulty: "Medium",
  category: "Science",
  date: "2025-12-19",
  time: "2:34"
}
```

### 9. Question Bank
**Requirements:**
- At least 20 questions per category
- Multiple categories (3+)
- Difficulty levels implemented
- Randomized question order
- Randomized answer order
- No duplicate questions per session

**Question Format:**
```javascript
{
  id: 1,
  category: "Science",
  difficulty: "Medium",
  question: "What is the chemical symbol for gold?",
  answers: ["Au", "Go", "Gd", "Ag"],
  correctAnswer: 0, // Index of correct answer
  explanation: "Au comes from the Latin 'aurum'"
}
```

---

## 🎨 UI/UX Requirements

### Visual Design
- Modern, clean interface
- Card-based layout
- Color-coded feedback
- Smooth animations
- Clear typography
- Progress indicators

### States
- **Welcome** - Initial setup screen
- **Quiz Active** - Question display
- **Answer Feedback** - Show correct/incorrect
- **Results** - Final score & review
- **High Scores** - Leaderboard
- **Loading** - Transitions (optional)

### Responsive Design
- **Mobile (320px+):** Stacked layout, large buttons
- **Tablet (768px+):** 2-column for answers
- **Desktop (1024px+):** Centered card, optimal spacing

### Accessibility
- Keyboard navigation (1, 2, 3, 4 for answers)
- ARIA labels
- Focus indicators
- Screen reader friendly
- High contrast mode (bonus)

---

## 💻 Technical Requirements

### Core JavaScript Concepts

**1. Classes/Objects**
```javascript
class Quiz {
  constructor(questions, config) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;
    // ...
  }

  nextQuestion() { /* ... */ }
  submitAnswer(answerIndex) { /* ... */ }
  calculateScore() { /* ... */ }
}
```

**2. Timers**
```javascript
let timer;
let timeRemaining = 30;

function startTimer() {
  timer = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      clearInterval(timer);
      autoSubmitAnswer();
    }
  }, 1000);
}
```

**3. Array Methods**
```javascript
// Shuffle questions
const shuffled = questions.sort(() => Math.random() - 0.5);

// Filter by difficulty
const easy = questions.filter(q => q.difficulty === 'Easy');

// Calculate percentage
const percentage = (correct / total) * 100;
```

**4. localStorage**
```javascript
// Save high scores
const highScores = JSON.parse(localStorage.getItem('quizScores')) || [];
highScores.push(newScore);
highScores.sort((a, b) => b.score - a.score);
localStorage.setItem('quizScores', JSON.stringify(highScores.slice(0, 10)));
```

**5. State Management**
```javascript
const QuizState = {
  currentQuestion: null,
  answers: [],
  score: 0,
  timeStarted: Date.now(),
  isActive: false
};
```

---

## 📊 Data Structure

### Quiz Configuration
```javascript
{
  category: "Science",
  difficulty: "Medium",
  numberOfQuestions: 10,
  timerEnabled: true,
  timePerQuestion: 30,
  playerName: "Player1"
}
```

### Question Object
```javascript
{
  id: 1,
  category: "Science",
  difficulty: "Medium",
  question: "What is H2O?",
  answers: ["Water", "Hydrogen", "Oxygen", "Carbon"],
  correctAnswer: 0,
  explanation: "H2O is the chemical formula for water",
  points: 10
}
```

### Quiz Results
```javascript
{
  score: 85,
  correct: 17,
  incorrect: 3,
  total: 20,
  percentage: 85,
  timeTaken: "3:45",
  answers: [
    {
      questionId: 1,
      userAnswer: 0,
      correctAnswer: 0,
      isCorrect: true,
      timeSpent: 8
    }
  ]
}
```

---

## ✅ Acceptance Criteria

### Minimum Pass (60%):
- 10+ questions available
- Multiple choice works
- Basic scoring
- Can complete quiz
- Shows results

### Portfolio-Ready (85%):
- 20+ questions across categories
- All features work
- Timer implemented
- High scores saved
- Professional UI
- Fully responsive
- Answer feedback

### Exceptional (95%):
- 50+ questions
- Multiple categories
- All features + bonuses
- Excellent UI/UX
- Smooth animations
- Perfect responsive
- Keyboard support
- Explanations for answers
- Statistics tracking

---

## 🐛 Edge Cases to Handle

1. **No questions available** - Show error message
2. **Timer reaches 0** - Auto-submit answer
3. **Clicking multiple answers quickly** - Prevent
4. **Browser refresh mid-quiz** - Save progress (bonus)
5. **Invalid localStorage data** - Handle gracefully
6. **Same question twice** - Prevent duplicates
7. **Empty player name** - Use default "Player"
8. **Zero questions selected** - Validate minimum
9. **All answers wrong** - Handle score of 0
10. **Rapid clicking** - Debounce buttons

---

## 🎯 Bonus Features (Optional)

1. **Hints System** - 3 hints per quiz (remove wrong answers)
2. **Lifelines** - 50/50, Ask the Audience (visual)
3. **Categories** - Science, History, Sports, Geography, etc.
4. **API Integration** - Open Trivia Database API
5. **Multiplayer** - Local 2-player mode
6. **Achievements** - Badges for milestones
7. **Difficulty Adaptation** - Adjust based on performance
8. **Sound Effects** - Correct/incorrect sounds
9. **Animations** - Question transitions
10. **Save Progress** - Resume quiz later
11. **Statistics** - Track performance over time
12. **Daily Challenge** - Special quiz each day

---

## 📚 Skills Assessment

This project tests:
- ✅ Classes & OOP
- ✅ Timers (setInterval/setTimeout)
- ✅ Array manipulation
- ✅ localStorage
- ✅ State management
- ✅ Event handling
- ✅ DOM manipulation
- ✅ Logic & algorithms
- ✅ Data structures
- ✅ UI/UX design

---

## 🚀 Recommended Approach

### Phase 1: Setup & Questions (Week 1)
1. Create HTML structure
2. Build question bank (20+ questions)
3. Implement setup screen
4. Basic styling

### Phase 2: Core Quiz Logic (Week 2)
5. Display questions
6. Handle answer selection
7. Calculate score
8. Navigation (next/previous)
9. Results screen

### Phase 3: Timer & Features (Week 3)
10. Implement timer
11. Answer feedback
12. Progress bar
13. High scores (localStorage)
14. Improve UI

### Phase 4: Polish & Enhancement (Week 4)
15. Animations
16. Sound effects (optional)
17. Keyboard support
18. Responsive design
19. Bug fixes
20. Final testing

---

## 💡 Implementation Tips

### Randomization
```javascript
// Shuffle array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Get random questions
function getRandomQuestions(questions, count) {
  return shuffle(questions).slice(0, count);
}
```

### Timer Management
```javascript
// Clear timer when component unmounts
function cleanup() {
  if (timer) {
    clearInterval(timer);
  }
}
```

### Score Calculation
```javascript
function calculateScore(answers, timeBonus = true) {
  let score = 0;
  answers.forEach(answer => {
    if (answer.isCorrect) {
      score += 10;
      if (timeBonus && answer.timeSpent < 10) {
        score += 5; // Speed bonus
      }
    }
  });
  return score;
}
```

---

## 🔑 Question Bank Structure

### Minimum Categories
1. **General Knowledge** (20 questions)
2. **Science** (20 questions)
3. **History** (20 questions)

### Difficulty Distribution
- Easy: 40%
- Medium: 40%
- Hard: 20%

---

**Target:** Build a quiz app that's fun, educational, and challenging! 🎯✨

