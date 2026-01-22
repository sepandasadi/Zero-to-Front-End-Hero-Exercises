# Quiz Application - Implementation Hints

Common challenges and solutions for building a quiz app.

---

## 🎯 Challenge 1: Managing Quiz State

### The Problem
Keeping track of current question, score, answers, and quiz progress.

### The Solution
Use a class-based approach for clean state management:

```javascript
class QuizManager {
  constructor(questions, config) {
    this.questions = questions;
    this.config = config;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
    this.startTime = Date.now();
    this.isActive = false;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  submitAnswer(answerIndex) {
    const question = this.getCurrentQuestion();
    const isCorrect = answerIndex === question.correctAnswer;

    // Record answer
    this.answers.push({
      questionId: question.id,
      userAnswer: answerIndex,
      correctAnswer: question.correctAnswer,
      isCorrect: isCorrect,
      timeSpent: this.getQuestionTime()
    });

    // Update score
    if (isCorrect) {
      this.score += this.calculatePoints();
    }

    return { isCorrect, correctAnswer: question.correctAnswer };
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false; // Quiz finished
  }

  calculatePoints() {
    let points = 10; // Base points

    // Time bonus (if answered quickly)
    const timeSpent = this.getQuestionTime();
    if (timeSpent < 10) {
      points += 5;
    }

    return points;
  }

  isFinished() {
    return this.currentIndex === this.questions.length - 1 &&
           this.answers.length === this.questions.length;
  }

  getResults() {
    const correct = this.answers.filter(a => a.isCorrect).length;
    const total = this.questions.length;
    const percentage = Math.round((correct / total) * 100);

    return {
      score: this.score,
      correct,
      incorrect: total - correct,
      total,
      percentage,
      timeTaken: this.getTotalTime(),
      answers: this.answers
    };
  }
}
```

---

## 🎯 Challenge 2: Timer Implementation

### The Problem
Creating a countdown timer that updates the UI and handles timeout.

### The Solution

```javascript
class Timer {
  constructor(duration, onTick, onTimeout) {
    this.duration = duration;
    this.timeRemaining = duration;
    this.onTick = onTick; // Callback for each second
    this.onTimeout = onTimeout; // Callback when time runs out
    this.intervalId = null;
    this.isPaused = false;
  }

  start() {
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.timeRemaining--;
        this.onTick(this.timeRemaining);

        if (this.timeRemaining <= 0) {
          this.stop();
          this.onTimeout();
        }
      }
    }, 1000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  reset(newDuration = this.duration) {
    this.stop();
    this.timeRemaining = newDuration;
    this.isPaused = false;
  }

  getTimeRemaining() {
    return this.timeRemaining;
  }
}

// Usage
const timer = new Timer(
  30, // 30 seconds
  (timeRemaining) => {
    // Update UI
    document.getElementById('timer').textContent = timeRemaining;

    // Warning state (last 10 seconds)
    if (timeRemaining <= 10) {
      document.getElementById('timer').classList.add('warning');
    }
  },
  () => {
    // Time's up!
    autoSubmitAnswer();
  }
);

timer.start();
```

---

## 🎯 Challenge 3: Shuffling Questions & Answers

### The Problem
Randomizing question order and answer order to prevent cheating.

### The Solution

```javascript
/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffle(array) {
  const shuffled = [...array]; // Copy array

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

/**
 * Get random questions from bank
 */
function getRandomQuestions(questionBank, count, difficulty = null, category = null) {
  let filtered = questionBank;

  // Filter by difficulty
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }

  // Filter by category
  if (category) {
    filtered = filtered.filter(q => q.category === category);
  }

  // Shuffle and take required count
  return shuffle(filtered).slice(0, count);
}

/**
 * Shuffle answers but track correct answer
 */
function shuffleAnswers(question) {
  const answers = question.answers.map((answer, index) => ({
    text: answer,
    originalIndex: index
  }));

  const shuffled = shuffle(answers);

  return {
    answers: shuffled.map(a => a.text),
    correctAnswer: shuffled.findIndex(a => a.originalIndex === question.correctAnswer)
  };
}

// Usage
const selectedQuestions = getRandomQuestions(questionBank, 10, 'Medium', 'Science');

selectedQuestions.forEach(question => {
  const { answers, correctAnswer } = shuffleAnswers(question);
  question.answers = answers;
  question.correctAnswer = correctAnswer;
});
```

---

## 🎯 Challenge 4: Answer Validation & Feedback

### The Problem
Providing immediate feedback and preventing multiple submissions.

### The Solution

```javascript
let answerSubmitted = false;

function selectAnswer(optionIndex) {
  if (answerSubmitted) return; // Prevent reselection

  // Clear previous selections
  document.querySelectorAll('.answer-option').forEach(opt => {
    opt.classList.remove('selected');
  });

  // Mark selected
  const selectedOption = document.querySelector(`[data-index="${optionIndex}"]`);
  selectedOption.classList.add('selected');

  // Enable submit button
  document.getElementById('submit-btn').disabled = false;
}

function submitAnswer() {
  if (answerSubmitted) return;

  const selectedOption = document.querySelector('.answer-option.selected');
  if (!selectedOption) {
    alert('Please select an answer');
    return;
  }

  answerSubmitted = true;

  // Stop timer
  if (timer) {
    timer.stop();
  }

  // Get selected answer
  const selectedIndex = parseInt(selectedOption.dataset.index);

  // Check answer
  const result = quizManager.submitAnswer(selectedIndex);

  // Show feedback
  showAnswerFeedback(selectedIndex, result);

  // Update score display
  updateScoreDisplay();

  // Change submit button to next button
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.textContent = 'Next Question';
  submitBtn.onclick = loadNextQuestion;
}

function showAnswerFeedback(selectedIndex, result) {
  const options = document.querySelectorAll('.answer-option');

  // Disable all options
  options.forEach(opt => {
    opt.style.pointerEvents = 'none';
  });

  // Highlight selected answer
  const selectedOption = options[selectedIndex];
  if (result.isCorrect) {
    selectedOption.classList.add('correct');
    showMessage('✅ Correct!', 'success');
  } else {
    selectedOption.classList.add('incorrect');
    // Show correct answer
    options[result.correctAnswer].classList.add('correct');
    showMessage('❌ Incorrect. The correct answer is highlighted.', 'error');
  }

  // Show explanation (if available)
  const question = quizManager.getCurrentQuestion();
  if (question.explanation) {
    showExplanation(question.explanation);
  }
}
```

---

## 🎯 Challenge 5: High Scores with localStorage

### The Problem
Saving and displaying top scores persistently.

### The Solution

```javascript
const HighScores = {
  STORAGE_KEY: 'quizHighScores',
  MAX_SCORES: 10,

  /**
   * Get all high scores
   */
  getAll() {
    const scores = localStorage.getItem(this.STORAGE_KEY);
    return scores ? JSON.parse(scores) : [];
  },

  /**
   * Add new score
   */
  add(scoreData) {
    const scores = this.getAll();

    // Add new score
    scores.push({
      ...scoreData,
      date: new Date().toISOString(),
      timestamp: Date.now()
    });

    // Sort by score (descending)
    scores.sort((a, b) => b.score - a.score);

    // Keep only top 10
    const topScores = scores.slice(0, this.MAX_SCORES);

    // Save
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(topScores));

    // Return rank (1-based)
    return scores.indexOf(scoreData) + 1;
  },

  /**
   * Check if score qualifies for leaderboard
   */
  qualifies(score) {
    const scores = this.getAll();

    if (scores.length < this.MAX_SCORES) {
      return true;
    }

    const lowestScore = scores[scores.length - 1].score;
    return score > lowestScore;
  },

  /**
   * Get scores by difficulty
   */
  getByDifficulty(difficulty) {
    return this.getAll().filter(s => s.difficulty === difficulty);
  },

  /**
   * Clear all scores
   */
  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  /**
   * Render leaderboard
   */
  render(containerId) {
    const scores = this.getAll();
    const container = document.getElementById(containerId);

    if (scores.length === 0) {
      container.innerHTML = '<p class="empty">No high scores yet. Be the first!</p>';
      return;
    }

    container.innerHTML = `
      <table class="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Correct</th>
            <th>Difficulty</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${scores.map((score, index) => `
            <tr>
              <td class="rank">${index + 1}</td>
              <td>${score.name}</td>
              <td class="score">${score.score}</td>
              <td>${score.correct}/${score.total}</td>
              <td><span class="badge badge-${score.difficulty.toLowerCase()}">${score.difficulty}</span></td>
              <td>${new Date(score.date).toLocaleDateString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
};

// Usage
const results = quizManager.getResults();
const rank = HighScores.add({
  name: playerName,
  score: results.score,
  correct: results.correct,
  total: results.total,
  percentage: results.percentage,
  difficulty: config.difficulty,
  category: config.category
});

if (rank <= 10) {
  alert(`Congratulations! You're #${rank} on the leaderboard!`);
}
```

---

## 🎯 Challenge 6: Progress Tracking

### The Problem
Showing quiz progress visually.

### The Solution

```javascript
function updateProgress() {
  const current = quizManager.currentIndex + 1;
  const total = quizManager.questions.length;
  const percentage = (current / total) * 100;

  // Update text
  document.getElementById('question-counter').textContent =
    `Question ${current} of ${total}`;

  // Update progress bar
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = `${percentage}%`;

  // Update question indicators
  const indicators = document.querySelectorAll('.question-indicator');
  indicators.forEach((indicator, index) => {
    if (index < current - 1) {
      indicator.classList.add('completed');
    } else if (index === current - 1) {
      indicator.classList.add('active');
    }
  });
}
```

---

## 🎯 Challenge 7: Results Breakdown

### The Problem
Showing detailed results with review of all questions.

### The Solution

```javascript
function displayResults(results) {
  const container = document.getElementById('results-container');

  // Summary
  const rating = getPerformanceRating(results.percentage);

  container.innerHTML = `
    <div class="results-summary">
      <h2>Quiz Complete!</h2>
      <div class="score-display">
        <div class="final-score">${results.score}</div>
        <div class="percentage">${results.percentage}%</div>
      </div>
      <div class="rating ${rating.class}">${rating.emoji} ${rating.text}</div>
      <div class="stats">
        <div class="stat">
          <span class="stat-label">Correct:</span>
          <span class="stat-value correct">${results.correct}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Incorrect:</span>
          <span class="stat-value incorrect">${results.incorrect}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Time:</span>
          <span class="stat-value">${results.timeTaken}</span>
        </div>
      </div>
    </div>

    <div class="results-review">
      <h3>Review Your Answers</h3>
      ${renderAnswersReview(results.answers)}
    </div>
  `;
}

function getPerformanceRating(percentage) {
  if (percentage >= 90) {
    return { text: 'Excellent!', emoji: '🏆', class: 'excellent' };
  } else if (percentage >= 75) {
    return { text: 'Great Job!', emoji: '🌟', class: 'great' };
  } else if (percentage >= 60) {
    return { text: 'Good Effort!', emoji: '👍', class: 'good' };
  } else {
    return { text: 'Keep Practicing!', emoji: '📚', class: 'fair' };
  }
}

function renderAnswersReview(answers) {
  return answers.map((answer, index) => {
    const question = quizManager.questions[index];
    const icon = answer.isCorrect ? '✅' : '❌';
    const className = answer.isCorrect ? 'correct' : 'incorrect';

    return `
      <div class="review-item ${className}">
        <div class="review-header">
          <span class="review-icon">${icon}</span>
          <span class="review-number">Question ${index + 1}</span>
        </div>
        <p class="review-question">${question.question}</p>
        <div class="review-answers">
          <p><strong>Your answer:</strong> ${question.answers[answer.userAnswer]}</p>
          ${!answer.isCorrect ? `
            <p><strong>Correct answer:</strong> ${question.answers[answer.correctAnswer]}</p>
          ` : ''}
        </div>
        ${question.explanation ? `
          <p class="review-explanation">${question.explanation}</p>
        ` : ''}
      </div>
    `;
  }).join('');
}
```

---

## 💡 General Tips

### Prevent Memory Leaks
```javascript
// Always clear timers when done
function cleanup() {
  if (timer) {
    timer.stop();
    timer = null;
  }
}

// Call cleanup before starting new quiz
window.addEventListener('beforeunload', cleanup);
```

### Keyboard Support
```javascript
document.addEventListener('keydown', (e) => {
  if (answerSubmitted) return;

  // 1, 2, 3, 4 keys for answers
  if (e.key >= '1' && e.key <= '4') {
    const index = parseInt(e.key) - 1;
    selectAnswer(index);
  }

  // Enter to submit
  if (e.key === 'Enter') {
    submitAnswer();
  }
});
```

---

**You've got the patterns! Now build your quiz app!** 🎯✨

