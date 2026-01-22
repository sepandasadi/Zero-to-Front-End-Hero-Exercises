/**
 * app.js - Main Application
 * Coordinates all modules and handles user interactions
 */

// Application state
let quizManager = null;
let timer = null;
let currentConfig = null;
let answerSelected = false;
let answerSubmitted = false;

/**
 * Initialize application
 */
function init() {
  UI.init();
  setupEventListeners();
  UI.showScreen('setup');

  // Load saved player name
  const savedName = localStorage.getItem('playerName');
  if (savedName) {
    document.getElementById('player-name').value = savedName;
  }

  console.log('Quiz Master initialized');
  console.log(`Question bank: ${QUESTION_BANK.length} questions`);
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Setup form submission
  document.getElementById('setup-form').addEventListener('submit', handleSetupSubmit);

  // View scores button
  document.getElementById('view-scores-btn').addEventListener('click', () => {
    UI.showScreen('scores');
    UI.displayHighScores();
  });

  // Answer selection (event delegation)
  document.getElementById('answers-container').addEventListener('click', (e) => {
    const option = e.target.closest('.answer-option');
    if (option && !answerSubmitted) {
      selectAnswer(option);
    }
  });

  // Submit answer button
  document.getElementById('submit-answer-btn').addEventListener('click', handleSubmitAnswer);

  // Results screen buttons
  document.getElementById('retake-quiz-btn').addEventListener('click', retakeQuiz);
  document.getElementById('new-quiz-btn').addEventListener('click', () => UI.showScreen('setup'));
  document.getElementById('show-scores-btn').addEventListener('click', () => {
    UI.showScreen('scores');
    UI.displayHighScores();
  });

  // High scores screen
  document.getElementById('difficulty-filter').addEventListener('change', (e) => {
    UI.displayHighScores(e.target.value);
  });
  document.getElementById('clear-scores-btn').addEventListener('click', () => {
    if (HighScores.clear()) {
      UI.displayHighScores();
      UI.showMessage('High scores cleared', 'success');
    }
  });
  document.getElementById('close-scores-btn').addEventListener('click', () => {
    if (quizManager) {
      UI.showScreen('results');
    } else {
      UI.showScreen('setup');
    }
  });
  document.getElementById('back-to-setup-btn').addEventListener('click', () => {
    UI.showScreen('setup');
  });

  // Keyboard support
  document.addEventListener('keydown', handleKeyPress);
}

/**
 * Handle setup form submission
 */
function handleSetupSubmit(e) {
  e.preventDefault();

  // Get config
  const playerName = document.getElementById('player-name').value.trim() || 'Player';
  const category = document.getElementById('category').value;
  const difficulty = document.getElementById('difficulty').value;
  const questionCount = parseInt(document.getElementById('question-count').value);
  const timerEnabled = document.getElementById('timer-enabled').checked;

  // Save player name
  localStorage.setItem('playerName', playerName);

  // Store config
  currentConfig = {
    playerName,
    category,
    difficulty,
    questionCount,
    timerEnabled
  };

  // Start quiz
  startQuiz(currentConfig);
}

/**
 * Start quiz
 */
function startQuiz(config) {
  // Get questions
  let questions = getQuestionsByCategoryAndDifficulty(config.category, config.difficulty);

  // Check if enough questions
  if (questions.length < config.questionCount) {
    UI.showMessage(`Only ${questions.length} questions available for this combination`, 'warning');
    return;
  }

  // Select random questions
  questions = questions.sort(() => Math.random() - 0.5).slice(0, config.questionCount);

  // Create quiz manager
  quizManager = new QuizManager(questions, config);
  quizManager.isActive = true;

  // Show quiz screen
  UI.showScreen('quiz');

  // Show/hide timer
  UI.toggleTimer(config.timerEnabled);

  // Display first question
  displayCurrentQuestion();
}

/**
 * Display current question
 */
function displayCurrentQuestion() {
  const question = quizManager.getCurrentQuestion();
  const progress = quizManager.getProgress();

  // Reset state
  answerSelected = false;
  answerSubmitted = false;

  // Display question
  UI.displayQuestion(question, progress);
  UI.updateScore(quizManager.score);

  // Start timer if enabled
  if (currentConfig.timerEnabled) {
    startQuestionTimer();
  }
}

/**
 * Start question timer
 */
function startQuestionTimer() {
  // Clear existing timer
  if (timer) {
    timer.stop();
  }

  // Create new timer
  timer = new Timer(
    30, // 30 seconds per question
    (timeRemaining) => {
      UI.updateTimer(timeRemaining);
    },
    () => {
      // Time's up - auto submit
      handleTimeout();
    }
  );

  timer.start();
}

/**
 * Handle answer selection
 */
function selectAnswer(option) {
  // Clear previous selection
  document.querySelectorAll('.answer-option').forEach(opt => {
    opt.classList.remove('selected');
  });

  // Mark selected
  option.classList.add('selected');
  answerSelected = true;

  // Enable submit button
  document.getElementById('submit-answer-btn').disabled = false;
}

/**
 * Handle answer submission
 */
function handleSubmitAnswer() {
  if (answerSubmitted) {
    // Move to next question
    loadNextQuestion();
    return;
  }

  if (!answerSelected) {
    UI.showMessage('Please select an answer', 'warning');
    return;
  }

  // Stop timer
  if (timer) {
    timer.stop();
  }

  // Get selected answer
  const selectedOption = document.querySelector('.answer-option.selected');
  const selectedIndex = parseInt(selectedOption.dataset.index);

  // Submit answer
  const result = quizManager.submitAnswer(selectedIndex);

  // Show feedback
  const question = quizManager.getCurrentQuestion();
  UI.showFeedback(selectedIndex, result, question);
  UI.updateScore(quizManager.score);

  // Mark as submitted
  answerSubmitted = true;

  // Change button text
  const submitBtn = document.getElementById('submit-answer-btn');
  submitBtn.textContent = quizManager.hasNextQuestion() ? 'Next Question' : 'View Results';
  submitBtn.disabled = false;
}

/**
 * Handle timeout (time's up)
 */
function handleTimeout() {
  if (answerSubmitted) return;

  // Auto-submit with no answer (incorrect)
  const question = quizManager.getCurrentQuestion();

  // Submit incorrect answer (use -1 to indicate no answer)
  quizManager.submitAnswer(-1);

  // Show feedback
  const result = {
    isCorrect: false,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    points: 0
  };

  UI.showFeedback(-1, result, question);
  UI.showMessage("Time's up!", 'warning');

  answerSubmitted = true;

  // Change button
  const submitBtn = document.getElementById('submit-answer-btn');
  submitBtn.textContent = quizManager.hasNextQuestion() ? 'Next Question' : 'View Results';
  submitBtn.disabled = false;
}

/**
 * Load next question or show results
 */
function loadNextQuestion() {
  if (quizManager.hasNextQuestion()) {
    quizManager.nextQuestion();
    displayCurrentQuestion();
  } else {
    // Quiz finished
    showResults();
  }
}

/**
 * Show results screen
 */
function showResults() {
  // Stop timer
  if (timer) {
    timer.stop();
    timer = null;
  }

  // Get results
  const results = quizManager.getResults();

  // Save high score
  if (HighScores.qualifies(results.score)) {
    const rank = HighScores.add({
      name: currentConfig.playerName,
      score: results.score,
      correct: results.correct,
      total: results.total,
      percentage: results.percentage,
      difficulty: currentConfig.difficulty,
      category: currentConfig.category
    });

    if (rank && rank <= 3) {
      UI.showMessage(`🏆 New high score! Rank #${rank}`, 'success');
    }
  }

  // Display results
  UI.showScreen('results');
  UI.displayResults(results);
}

/**
 * Retake quiz with same settings
 */
function retakeQuiz() {
  if (currentConfig) {
    startQuiz(currentConfig);
  }
}

/**
 * Handle keyboard presses
 */
function handleKeyPress(e) {
  // Only handle when quiz is active
  if (!quizManager || !quizManager.isActive || answerSubmitted) return;

  // Number keys 1-4 for answer selection
  if (e.key >= '1' && e.key <= '4') {
    const index = parseInt(e.key) - 1;
    const options = document.querySelectorAll('.answer-option');
    if (options[index]) {
      selectAnswer(options[index]);
    }
  }

  // Enter to submit
  if (e.key === 'Enter' && answerSelected) {
    handleSubmitAnswer();
  }
}

/**
 * Cleanup function
 */
function cleanup() {
  if (timer) {
    timer.stop();
    timer = null;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);

