/**
 * Timer.js - Timer Class
 * Countdown timer for quiz questions
 */

class Timer {
  constructor(duration, onTick, onTimeout) {
    this.duration = duration;
    this.timeRemaining = duration;
    this.onTick = onTick;
    this.onTimeout = onTimeout;
    this.intervalId = null;
    this.isPaused = false;
    this.questionStartTime = Date.now();
  }

  start() {
    this.questionStartTime = Date.now();
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.timeRemaining--;

        // Call tick callback
        if (this.onTick) {
          this.onTick(this.timeRemaining);
        }

        // Check if time's up
        if (this.timeRemaining <= 0) {
          this.stop();
          if (this.onTimeout) {
            this.onTimeout();
          }
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
    this.duration = newDuration;
    this.timeRemaining = newDuration;
    this.isPaused = false;
    this.questionStartTime = Date.now();
  }

  getTimeRemaining() {
    return this.timeRemaining;
  }

  getTimeSpent() {
    return this.duration - this.timeRemaining;
  }

  getQuestionTime() {
    return Math.floor((Date.now() - this.questionStartTime) / 1000);
  }
}

