/**
 * UI.js - User Interface / DOM Manipulation
 * All UI updates and screen management
 */

const UI = {
  // Screens
  setupScreen: null,
  quizScreen: null,
  resultsScreen: null,
  scoresScreen: null,

  /**
   * Initialize UI elements
   */
  init() {
    this.setupScreen = document.getElementById('setup-screen');
    this.quizScreen = document.getElementById('quiz-screen');
    this.resultsScreen = document.getElementById('results-screen');
    this.scoresScreen = document.getElementById('scores-screen');
  },

  /**
   * Show specific screen
   */
  showScreen(screenName) {
    this.setupScreen.style.display = 'none';
    this.quizScreen.style.display = 'none';
    this.resultsScreen.style.display = 'none';
    this.scoresScreen.style.display = 'none';

    switch(screenName) {
      case 'setup':
        this.setupScreen.style.display = 'block';
        break;
      case 'quiz':
        this.quizScreen.style.display = 'block';
        break;
      case 'results':
        this.resultsScreen.style.display = 'block';
        break;
      case 'scores':
        this.scoresScreen.style.display = 'block';
        break;
    }
  },

  /**
   * Display current question
   */
  displayQuestion(question, progress) {
    // Update question counter
    document.getElementById('question-counter').textContent =
      `Question ${progress.current} of ${progress.total}`;

    // Update progress bar
    document.getElementById('progress-bar').style.width = `${progress.percentage}%`;

    // Display question text
    document.getElementById('question-text').textContent = question.question;

    // Display answers
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = question.answers.map((answer, index) => `
      <button class="answer-option" data-index="${index}">
        <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
        <span class="answer-text">${answer}</span>
      </button>
    `).join('');

    // Hide feedback message
    document.getElementById('feedback-message').style.display = 'none';

    // Reset submit button
    const submitBtn = document.getElementById('submit-answer-btn');
    submitBtn.textContent = 'Submit Answer';
    submitBtn.disabled = true;
  },

  /**
   * Show answer feedback
   */
  showFeedback(selectedIndex, result, question) {
    const options = document.querySelectorAll('.answer-option');

    // Disable all options
    options.forEach(opt => {
      opt.style.pointerEvents = 'none';
      opt.classList.remove('selected');
    });

    // Highlight selected answer
    const selectedOption = options[selectedIndex];
    if (result.isCorrect) {
      selectedOption.classList.add('correct');
    } else {
      selectedOption.classList.add('incorrect');
      // Show correct answer
      options[result.correctAnswer].classList.add('correct');
    }

    // Show feedback message
    const feedbackEl = document.getElementById('feedback-message');
    feedbackEl.style.display = 'block';

    const icon = result.isCorrect ? '✅' : '❌';
    const message = result.isCorrect ? 'Correct!' : 'Incorrect';
    const points = result.isCorrect ? ` +${result.points} points` : '';

    feedbackEl.innerHTML = `
      <div class="feedback-icon">${icon}</div>
      <div class="feedback-content">
        <p class="feedback-title">${message}${points}</p>
        ${result.explanation ? `<p class="feedback-explanation">${result.explanation}</p>` : ''}
      </div>
    `;

    feedbackEl.className = `feedback-message ${result.isCorrect ? 'correct' : 'incorrect'}`;
  },

  /**
   * Update score display
   */
  updateScore(score) {
    document.getElementById('score-display').textContent = `Score: ${score}`;
  },

  /**
   * Update timer display
   */
  updateTimer(timeRemaining) {
    const timerEl = document.getElementById('timer');
    timerEl.textContent = timeRemaining;

    // Remove all state classes
    timerEl.classList.remove('warning', 'critical');

    // Add warning/critical classes
    if (timeRemaining <= 5) {
      timerEl.classList.add('critical');
    } else if (timeRemaining <= 10) {
      timerEl.classList.add('warning');
    }
  },

  /**
   * Show/hide timer container
   */
  toggleTimer(show) {
    const timerContainer = document.getElementById('timer-container');
    timerContainer.style.display = show ? 'flex' : 'none';
  },

  /**
   * Display quiz results
   */
  displayResults(results) {
    // Final score
    document.getElementById('final-score').textContent = results.score;

    // Stats
    document.getElementById('correct-count').textContent = results.correct;
    document.getElementById('incorrect-count').textContent = results.incorrect;
    document.getElementById('time-taken').textContent = results.timeTaken;

    // Performance rating
    const rating = this.getPerformanceRating(results.percentage);
    document.getElementById('performance-rating').innerHTML = `
      <div class="rating-emoji">${rating.emoji}</div>
      <div class="rating-text">${rating.text}</div>
      <div class="rating-percentage">${results.percentage}%</div>
    `;

    // Review answers
    this.displayAnswersReview(results.answers);
  },

  /**
   * Get performance rating based on percentage
   */
  getPerformanceRating(percentage) {
    if (percentage >= 90) {
      return { text: 'Excellent!', emoji: '🏆', class: 'excellent' };
    } else if (percentage >= 75) {
      return { text: 'Great Job!', emoji: '🌟', class: 'great' };
    } else if (percentage >= 60) {
      return { text: 'Good Effort!', emoji: '👍', class: 'good' };
    } else if (percentage >= 40) {
      return { text: 'Keep Practicing!', emoji: '📚', class: 'fair' };
    } else {
      return { text: 'Try Again!', emoji: '💪', class: 'poor' };
    }
  },

  /**
   * Display answers review
   */
  displayAnswersReview(answers) {
    const container = document.getElementById('answers-review');

    container.innerHTML = answers.map((answer, index) => {
      const icon = answer.isCorrect ? '✅' : '❌';
      const className = answer.isCorrect ? 'correct' : 'incorrect';

      return `
        <div class="review-item ${className}">
          <div class="review-header">
            <span class="review-icon">${icon}</span>
            <span class="review-number">Question ${index + 1}</span>
            <span class="review-points">${answer.points} pts</span>
          </div>
          <p class="review-question">${answer.question}</p>
          <div class="review-answers">
            <p class="review-user-answer">
              <strong>Your answer:</strong> ${answer.answers[answer.userAnswer]}
            </p>
            ${!answer.isCorrect ? `
              <p class="review-correct-answer">
                <strong>Correct answer:</strong> ${answer.answers[answer.correctAnswer]}
              </p>
            ` : ''}
          </div>
          ${answer.explanation ? `
            <p class="review-explanation">
              <strong>Explanation:</strong> ${answer.explanation}
            </p>
          ` : ''}
        </div>
      `;
    }).join('');
  },

  /**
   * Display high scores
   */
  displayHighScores(difficulty = 'all') {
    const scoresTable = document.getElementById('scores-table');
    scoresTable.innerHTML = HighScores.render(difficulty);
  },

  /**
   * Show message (toast notification)
   */
  showMessage(message, type = 'info') {
    // Remove existing message
    const existing = document.querySelector('.toast-message');
    if (existing) {
      existing.remove();
    }

    // Create message element
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show with animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};

