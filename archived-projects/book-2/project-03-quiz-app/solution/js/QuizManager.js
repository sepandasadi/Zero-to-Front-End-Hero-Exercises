/**
 * QuizManager.js - Quiz Logic & State Management
 * Handles quiz flow, scoring, and question management
 */

class QuizManager {
  constructor(questions, config) {
    this.questions = this.prepareQuestions(questions);
    this.config = config;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
    this.startTime = Date.now();
    this.questionStartTime = Date.now();
    this.isActive = false;
  }

  /**
   * Prepare questions: shuffle questions and answers
   */
  prepareQuestions(questions) {
    // Shuffle questions
    const shuffled = this.shuffle([...questions]);

    // Shuffle answers for each question
    return shuffled.map(question => {
      const { answers, correctAnswer } = this.shuffleAnswers(question);
      return {
        ...question,
        answers,
        correctAnswer
      };
    });
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Shuffle answers while tracking correct answer
   */
  shuffleAnswers(question) {
    const answers = question.answers.map((answer, index) => ({
      text: answer,
      originalIndex: index
    }));

    const shuffled = this.shuffle(answers);

    return {
      answers: shuffled.map(a => a.text),
      correctAnswer: shuffled.findIndex(a => a.originalIndex === question.correctAnswer)
    };
  }

  /**
   * Get current question
   */
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  /**
   * Get question by index
   */
  getQuestion(index) {
    return this.questions[index];
  }

  /**
   * Submit answer for current question
   */
  submitAnswer(answerIndex) {
    const question = this.getCurrentQuestion();
    const isCorrect = answerIndex === question.correctAnswer;
    const timeSpent = this.getQuestionTime();

    // Calculate points
    const points = this.calculatePoints(isCorrect, timeSpent);

    // Record answer
    this.answers.push({
      questionId: question.id,
      question: question.question,
      answers: question.answers,
      userAnswer: answerIndex,
      correctAnswer: question.correctAnswer,
      isCorrect,
      timeSpent,
      points,
      explanation: question.explanation
    });

    // Update score
    if (isCorrect) {
      this.score += points;
    }

    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      points,
      explanation: question.explanation
    };
  }

  /**
   * Calculate points for answer
   */
  calculatePoints(isCorrect, timeSpent) {
    if (!isCorrect) return 0;

    let points = 10; // Base points

    // Time bonus (if answered quickly)
    if (timeSpent < 10) {
      points += 5; // Speed bonus
    } else if (timeSpent < 20) {
      points += 2; // Small bonus
    }

    return points;
  }

  /**
   * Move to next question
   */
  nextQuestion() {
    if (this.hasNextQuestion()) {
      this.currentIndex++;
      this.questionStartTime = Date.now();
      return true;
    }
    return false;
  }

  /**
   * Check if there's a next question
   */
  hasNextQuestion() {
    return this.currentIndex < this.questions.length - 1;
  }

  /**
   * Check if quiz is finished
   */
  isFinished() {
    return this.currentIndex === this.questions.length - 1 &&
           this.answers.length === this.questions.length;
  }

  /**
   * Get current progress
   */
  getProgress() {
    return {
      current: this.currentIndex + 1,
      total: this.questions.length,
      percentage: ((this.currentIndex + 1) / this.questions.length) * 100
    };
  }

  /**
   * Get time spent on current question
   */
  getQuestionTime() {
    return Math.floor((Date.now() - this.questionStartTime) / 1000);
  }

  /**
   * Get total time taken
   */
  getTotalTime() {
    const totalSeconds = Math.floor((Date.now() - this.startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Get quiz results
   */
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
      answers: this.answers,
      config: this.config
    };
  }

  /**
   * Reset quiz
   */
  reset() {
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
    this.startTime = Date.now();
    this.questionStartTime = Date.now();
    this.isActive = false;
    this.questions = this.prepareQuestions(this.questions);
  }
}

